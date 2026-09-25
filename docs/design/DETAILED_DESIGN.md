# Detailed Design

構成は[BASIC_DESIGN](BASIC_DESIGN.md)、要求は[REQUIREMENTS](REQUIREMENTS.md)。以下は実装契約であり、現時点でAPIやpackageが存在するという意味ではない。

## 1. Japanese-first contract

対象は `launcher/src/App.tsx` の次の2箇所だけ。

```tsx
const documentLanguage = snapshot?.state.language ?? "ja";
const language = snapshot.state.language ?? "ja";
```

`launcher/electron/state.cjs` の `language: null` と `snapshot.state.language ? "interaction" : "language"` は維持する。

| saved language | display | onboarding |
| --- | --- | --- |
| null | ja | language |
| en / zh-CN / zh-TW / ja / ko | saved value | interaction |

一般UIはi18n.ts、Limitsはlimits-copy.ts、localeはlanguages.json、native dialog/menuは既存native copyを利用する。翻訳対象は表示文言。表示とmachine matchが混在する診断はlocalizeRuntimeMessage等で分離してから翻訳する。selector/connector名/MCP名/endpoint/CLI option/protocol fieldは維持する。

## 2. Package / entry / provenance

`packages/c2c-review/` にNode/TypeScript packageを置く。sourceのpnpm-lock.yaml、tsconfig、test方式、MIT通知を保持し、`UPSTREAM.json`へ次を記録する。

```text
schemaVersion
sourceRepository = Shota-Zaki/codex-with-chatgpt
sourceCommit = 89af4fa34952fe58e017b095ae2f793420cf05b0
sourceVersion = 0.1.3
files[] = sourcePath / sourceBlobSha / targetPath / migrationClass / localPatchReason
```

sourceBlobShaは取得したGit blobの値。未取得ファイルへ架空のSHAを書かない。rootのBun lockにC2C依存をhoistしない。初期移植ではsource lockの解決を固定し、依存更新は独立WUにする。

Nodeのserve入口だけがprivacy bootstrapを適用してBridgeを起動する。ライブラリのimportはlisten/spawn/ファイル変更を起こさない。本体BunはC2Cのserver moduleを直接importしない。Hostが固定されたNode実行パスとpackage entryを指定し、任意のcommand stringやshell:trueをReviewer/Rendererから受け取らない。

公開前のfixture testは一時Workspace・合成canary・隔離state・loopbackだけを使える。実Workspaceでの起動や外部公開とは区別する。

## 3. WorkspacePolicy / RepositoryView

Hostが登録したWorkspace rootとRepository registryを使用する。登録はprivate管理操作でありMCP toolではない。Repository入力はserver側IDまたはregistryに登録した相対識別子に解決し、任意のabsolute pathをRepositoryとして採用しない。

RepositoryViewは次を持つ。

```text
workspaceId / repositoryId / canonicalRepositoryRoot / parentWorkspacePolicy
branch / fullCommit / workingTreeState
```

root realpathがWorkspace内、選択Repo内のpathがそのRepo内、Gitが報告するtop-levelも選択Repoと整合することを検証する。親Workspaceの.c2cignoreとRepo/下位規則の両方を適用し、上位denyは下位negationで解除しない。case-sensitive filesystem、Windows形式、null byte、symlink、未存在leaf、同時差替えもfixture対象。

`.c2c.json`、package.json、project detection、directory metadataもPolicy経由にする。通常read_fileだけを安全にしてmetadata経路を例外にしない。直接読取・検索・Git・execution metadataのどこからも合成Secret canaryが出ないことを試験する。

### Repository選択の互換性

既存9 toolの名前と既存引数の意味は維持する。追加の `repository` はoptional。単一Repoなら省略時はそのRepo。複数Repoで省略が曖昧なら `AMBIGUOUS_REPOSITORY`。最初のRepoへ黙ってfallbackしない。workspace_infoの無指定時は共有可能なregistry概要を返せるが、Git/証跡は選択Repoなしに混同しない。

未知ID、未登録、権限外は拒否する。registryに載せるRepo一覧自体もcallerの共有範囲でfilterする。sourceのWorkspace IDと新Repository IDは別物。旧ID/旧記録を現在Repoへ推測で再割当てしない。

## 4. Git / review snapshot

既存git_diffのunstaged/staged/headは維持する。`head`は作業ツリー対HEADである。commit間比較には追加mode `range` と対になった `base_commit` / `head_commit` を設ける。両commitは選択Repo内で解決した完全なobject IDに固定する。legacy clientへのschema変更点をfixtureと互換表へ記録する。

Reviewerは次を順に独立取得する。

1. Repo identity、branch、Git status、完全なcandidate commit。
2. base→candidateの変更一覧とページングされたdiff。
3. 変更source。固定revisionのread契約、または同じrevisionを維持するread-only snapshot viewを使う。
4. 対応run/Taskのtest/build/typecheck記録と必要なoutput。
5. 読取終了時のrevision/statusの再確認。

初期の実装方式は、Git objectからcommit固定の内容を返すRepositoryView adapterとする。read_fileにoptional `revision` を追加し、指定時はそのcommitのblobを読む。path/Secret判定は読取前に適用する。列挙・検索までsnapshot対応を拡張する際もlive treeと混在した結果を同一snapshotと称しない。

range diffはrenameの旧/新path両側を検査し、Secretを含むrename全体をwithholdする。Gitは固定argv、literal pathspec、no external diff/textconv/fsmonitor、制限したenvとtimeoutで実行する。通常pathが機密名からrenameされた履歴にも注意する。

ページングのcursorはsnapshotIdに結び付ける。途中で対象が変わった結果、取得失敗、上限超過、不完全結果を空diff成功にしない。実行されたGit commandの失敗と非Git Repoを区別する。UTF-8境界・巨大行・offset終端を試験する。

## 5. Execution evidence v2

旧recordは読める互換資料として残すが、Repo/commitへ結び付いていないrecordは `unbound` で、統合受入に使用しない。`test_status`はtestを実行しない。

新しい内部manifestは少なくとも次を持つ。既存MCP responseには既存fieldを保ったうえでversionとscope情報を追加する。

```text
schemaVersion = 2
workspaceId / repositoryId / taskId / runId / iteration
baseCommit / candidateCommit / testedTreeId
startedAt / finishedAt
implementationModel / effort
commands[]:
  argv / cwdRelative / exitCode / status
  startedAt / finishedAt
  outputId / contentDigest / truncated / restricted
```

statusはpassed / failed / not_run / blockedを区別し、exitCode:nullを0へ変換しない。cwdはregistryから解決する。free textには長さ制限・sanitizeを適用する。生のsecret、token、環境変数dumpを保存・応答へ混ぜない。

### 記録の所有権

Host recorderが実command開始/終了を観測してinboxへ記録する。Codexの要約だけをtrusted executionとしない。brokerはschema/size/ID/Repo/revisionを検査してsanitize済みstoreへ移す。inboxへの書込権限をauth/runtime/review判定storeへ広げない。C2C MCP経由のrecord追加・test実行は公開しない。

### 読取時の検査

本文は保存時だけでなく返却時にも検査する。metadataのcommand/notes/tests/changedFilesも対象。body欠落、digest不一致、未知ID、別Repo、private key、parse失敗は明示error/statusとし、空文字okにしない。retention上限、atomic更新、並行append、symlink、肥大JSONLを試験する。hashだけで記録者の正しさを証明したとは説明しない。

### commitと証跡commit

test対象code commitまたはtested treeを実行前後に確認し、candidateに結び付ける。後から現在HEADを古いrecordへ補完しない。証跡・TASKSを保存する後続commitはcode anchorと別に記録する。後続差分が宣言されたEvidence/Project文書だけであることを独立確認した場合に限り、Accepted code anchorを維持できる。製品source/test/config/lockが変わればCurrent Validationはstaleとなり、再検証が必要。

## 6. Auth / MCP / management

Reviewer用allowlistは以下の9つだけ。

```text
workspace_info
list_directory
read_file
search_workspace
git_status
git_diff
test_status
execution_summary
execution_output
```

実装を持たないwrite/shell toolをreadOnlyHintで偽装する方式ではない。未知tool・任意command・test実行・state更新はMCP schemaとdispatch両方で拒否する。sourceのtrusted in-process test用auth省略経路を公開HTTPへ接続しない。HTTPは常にbearer middlewareを通す。

C2C専用issuer/resourceとWorkspace/Repo scopeを束縛する。PKCE S256、登録済みclient/redirect、code単回消費、refresh rotation、revocation、scope不足を検証する。scope省略と未知scopeだけの要求を区別し、不正scopeから全scopeへ昇格しない。指定されたresourceがC2C resourceと一致しない場合は拒否し、省略時の単一resource既定は互換テストで明示する。

OAuth metadataのbase URLは信頼済み設定から構成し、任意Host/forwarded headerをissuerとして採用しない。Pairing/registration/pending requestは期限・試行・保存数を制限する。実際のChatGPT connectorでの再認証/refreshはENV受入で確認し、mockだけでlive対応済みにしない。

Admin APIはloopback socket、private admin token、proxy経由拒否を維持する。Host adapterから呼べるrouteも固定allowlistにする。管理tokenとOAuth tokenをRenderer、LunaのPacket、MCP outputへ返さない。公開healthはservice/statusだけ。詳細identityはprivate管理面で確認する。

## 7. Node runtime / Host adapter

privacy bootstrapはすべてのNode起動入口で適用する。本体Bunには副作用を与えない。C2C fetchは許可したloopbackと最小healthのみ、外部healthでは元header/Cookieを引き継がずredirect拒否。Git/rg/cloudflaredにはOS/C2Cの必要envだけを渡す。Nodeのfetch制限とOS/network sandboxを区別する。

Host adapterの操作はstatus/start/attach/stopと限定recording。Node executable、entry、state namespace、Workspace、port、ownerを検証する。既存sourceのstate/token/DNSを流用しない。public healthだけでprocess所有権を認定せず、private identityを確認する。unknown owner/PIDは診断を返し、killやlock削除を行わない。

Macはsupervisor→worker、UUID、volume脱落、Named Tunnel、有限backoff、log rotationを維持する。Desktop ownerとlaunchd ownerは排他。Launcherを閉じてもlaunchd所有serviceは終了させない。Node/C2Cの配布、署名/同梱、source通知、clean installは別の配布受入で確認する。

## 8. Manual loop and later automation

wire protocolはsourceのINIT / PLAN / EXECUTING / EXECUTED / REVIEW / DONE / BLOCKED / ERROR / HANDOFFを尊重する。ローカルcheckpointのPLAN_RECEIVED / EXECUTED_LOCAL / EXECUTED_SENT等とは区別する。表示用Needs Userは新しいwire stateではなく、BLOCKED + waitingFor:USERに対応付ける。

```text
PLAN → EXECUTING → EXECUTED → REVIEW
                              ├→ Finding / PLAN → Fix → EXECUTED → REVIEW
                              ├→ DONE (all gates satisfied)
                              └→ BLOCKED or ERROR (not PASS)
```

ReviewResultの契約:

```text
schemaVersion / reviewId / repositoryId / taskId / runId / candidateCommit
reviewerContextId / reviewedEvidenceIds / acceptanceIds
verdict = findings | accepted | blocked | error
findings[] = id / severity / file / location / evidence / expectedCorrection / requiredVerification
```

Reviewerとimplementerのcontextは別。Findingは実行するshell文字列ではなく、Hostがscope/Acceptanceを確認して次の有限Packetへ変換する。Repo内容から取得した命令で権限や上限を変更しない。

手動受入は、実Lunaモデル/effort記録、独立C2C読取、少なくとも1つの実際のFinding、修正commit、再Reviewまで記録する。自然なFindingが出ない場合は、合成fixture Repositoryに限定した既知の不合格ケースで修正経路を試験し、その条件を明記する。本番コードへ意図的な欠陥を混ぜない。

自動化はこの手動受入後。既定iteration上限12を上限契約として扱い、Taskごとの有限deadline、cancel、attempt ID、checkpointのatomic保存、同一run/eventのdedupeを実装する。resumeでEXECUTEDを再送しても実装を再実行しない。接続/authエラーはそのreviewをblockedにし、他Repo/Ready Taskまで停止させない。main変更・公開・Credential変更等の権限を復旧目的で拡張しない。

## 9. Verification / progression

Required VerificationはREQUIREMENTSのV-*へ対応付ける。まずsource fixtureを再利用し、F01〜F09の不足を追加する。read-only試験はMCPの全toolを呼び、Workspaceの内容/属性差分とFS/process副作用を観測する。privateログ/認証stateへの許容された書込とWorkspace writeを混同しない。

未実施はnot_run、依存環境不足はblocked、失敗はfailed。C2C単体、独立live review、Mac24h、package配布、source parityは別の受入。C2C接続不能でも、未精査source確認、scaffold、移植、fixture作成、local test、GitHub反映は継続できる。

実装TaskはTASKS、次WUと対象ファイルはNEXT_WORK、実行手順は実装Packet、実施結果はEvidenceへ保存する。Accepted code anchorとCurrent Validationを分離し、過去のPASSを現在の変更へ無条件継承しない。
