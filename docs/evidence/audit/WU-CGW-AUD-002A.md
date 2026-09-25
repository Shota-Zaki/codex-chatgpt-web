# WU-CGW-AUD-002A — 起動入口・CLI・共通設定の静的監査

実施日: 2026-09-25。Task: CGW-AUD-002。source: `Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0`。

この記録は追加8ファイルの本文確認。CLIやサービスを実行した記録ではない。完全監査Task全体、全test実行、live C2C受入は未完了。

## 取得範囲

| source path | Git blob SHA | 範囲 |
| --- | --- | --- |
| bin/c2c.js | 2f47d2ad2a522dddd5c229208e97eacead8b40e0 | 全文 |
| runtime/bootstrap.mjs | 9422df8f44f6ff8f662c71212bf4f2ebdc8ade27 | 全文 |
| src/config/paths.ts | be46abaccd8e3e1297d97ca6454f35c30fcace16 | 全文 |
| src/config/endpoint.ts | 1d97fa073b5474d414c6f6f4cf72d5d12985b591 | 全文 |
| src/config/ui-prefs.ts | 333855890987236d3252df88f0df54a1fc38f881 | 全文 |
| src/logger/index.ts | 017f40f840862b80f970c9c71a8e5da7a648426c | 全文 |
| src/auth/html.ts | 0650045f017c1f8d70c223958f7469b751580e44 | 全文 |
| src/cli/index.ts | 5c8a671d4a08da4732c993cf26f4993a675e1f7a | 1–230、231–470、471–730、731–1000、1001–EOFを連続取得 |

## 保持する実装

bin入口はbootstrapをimportし、未build時に起動するtsx側にもbootstrapを指定する。既存のdaemon、Mac worker、package scriptsと合わせ、正式な起動経路を移植するときに初期化を落とさない。

paths.tsは状態JSONを一時ファイル経由で更新し、0600の設定を試みる。readJsonIfExistsはlstatで通常ファイル以外・leaf symlinkを拒否する。この既存保護を残す。

loggerは既知のC2C token、Bearer、Pairing code等をredactする。POSIXではO_NOFOLLOWとfstatでログの通常ファイル性を確認する。auth/html.tsにはescapeHtml、CSP、no-store、frame/referrer制限がある。統合時に削除しない。

endpointはWorkspaceごとの既存connector名を保持する。名称を勝手に翻訳・変更するのでなく、表示ラベルと機械的な接続識別を分離する。prefsの選択値はauto/manualとして検証されているが、表示文言と保存先は既存Launcherへのadapter対象とする。

## 既存Findingの精密化

### F01: metadataとsymlink

先の主要経路監査ではWorkspaceからreadJsonIfExistsへの直接呼出を確認した。今回、そのhelper自身にleaf symlink拒否があると確認できた。したがって「通常の外向きleaf symlinkがそのまま読める」という実証はない。

残る問題は、metadata取得がWorkspaceの.c2cignore/Secret Policyを経由しないこと。ignoreしたpackage.jsonのname/scripts等がworkspace_infoへ出ないことをfixtureで確認し、同時差替えの境界を別途試験する。既存helperの防御を否定したり、未実証の流出を確定扱いしたりしない。

### F02: 許可設定変更の呼出元

setupと既定doctorはtrySandboxAllowを呼び、C2C状態領域全体をCodexの書込許可へ追加し得る。sandbox-allowコマンドも同じhelperを使う。統合版は元のCLIをそのままHost/Reviewerへ公開せず、限定inboxとprivate stateを分離する。

追加で、doctor --no-fixにもhealthyな接続先をpersistWorkspaceEndpointへ渡す経路がある。この分岐はopts.fixでguardされていない。したがって--no-fixを「状態ファイルを一切変更しない診断」とは扱えない。read-only診断adapterは状態読取・観測だけを行い、保存/修復/Pairing/Tunnel操作は別の明示管理操作へ分ける。

### F05: 診断結果の成功判定

doctorの--json経路はreportを出力して早期returnするため、後段の失敗時exitCode設定へ進まない。未認証MCPの401をreport.oauthのokとしているが、それだけではPKCE/refresh/権限の受入は証明できない。Tunnelのhealth判定にもresponse.okだけの箇所がある。

Hostはコマンドのexit codeだけで診断成功やC2C受入を決めない。service/workspace identity、個別report、auth機能試験、実tool結果を確認する。これらはCGW-C2C-005/006/007のVerificationへ対応させる。

### F06/F08: ログとCLIの受入境界

共通loggerにはこのファイル内のrotation処理がなく、logsコマンドは候補ログを全文読取後に行数を切り出す。Mac supervisorのservice.log rotationだけで全ログの24時間運用を保証しない。bridge.log、daemon stdout等にも保持上限・読取上限を設ける。

CLIにはsetup、pair/unpair、tunnel choose/login、session set/clear、prefs set等の書込・外部設定操作がある。これらはread-only MCPの9 toolとは別の権限面。CLI全体をReviewerへ渡さない。sourceのrecord --output-fileはローカルHarnessによる明示的な出力取込であり、MCPの任意ファイル読取toolと混同しない。

## Verification result

8ファイルの固定blob・全文確認: 実施。既存Findingとの突合: 実施。

CLI実行、test、typecheck、build、実Secret/Workspace拒否試験、live connector、Mac実機: 未実施。これらを静的確認の結果からPASSへ変換しない。

## 残件

残りTunnel補助/provision、serviceインストール入口、Skill、全test本文・依存、既存本体のadapter接合点の精査が残る。AUD-002Aの終了はCGW-AUD-002全体のDoneではない。次はAUD-002Bの小さいscopeへ進む。
