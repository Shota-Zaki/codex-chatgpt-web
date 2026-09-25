# WU-CGW-AUD-002B1 — Tunnel静的監査

日付: 2026-09-25。Task: CGW-AUD-002。source: `Shota-Zaki/codex-with-chatgpt@89af4fa34952fe58e017b095ae2f793420cf05b0`。以下8ファイルの全文を取得・確認した。コマンド、Cloudflare認証、DNS変更、Tunnel起動は実行していない。

| source path | Git blob SHA |
| --- | --- |
| src/tunnel/cloudflared.ts | 9f7e0a2dc3d62904769dc1f9e69491c410788fa5 |
| src/tunnel/detect.ts | 4f5c396ff8857fdfd2b0367eab1aa1ba3c989366 |
| src/tunnel/hostname.ts | a659c28e7cc789357b2e63335f9c701041adbb35 |
| src/tunnel/named-provision.ts | 5f1d34a6709ba9c1999c2ae2d902470b0c5c124f |
| src/tunnel/protocol.ts | bc0f9f770fd8832c72e415bb1a53d398d9bff1f7 |
| src/tunnel/provider.ts | f557e955a0bb51ca63171aaf79d03296f70dc475 |
| src/tunnel/state.ts | 7c99daffb4222ebe64371ee0c788c6f5aa9f169f |
| src/version.ts | 4ff9ea69474422e18a27515e54e3fd438b2c5ab0 |

## 再利用する防御

Quick URLはHTTPSのtrycloudflareサブドメインへ限定し、api.trycloudflareを除外する。起動時healthはHTTP statusだけでなくservice/status本文を確認し、redirect拒否・timeoutを指定している。start中のPromise再利用、キャンセル、子process identity確認もある。CLI doctorの弱い成功判定と、このprovider内部の強いhealth判定を混同しない。

cloudflaredEnvironmentはOS/path/home/temp/locale/cert関連に絞り、親shellの任意APIキー等を継承しない。protocolはauto/quic/http2だけを固定argvへ変換する。これらはM11/M12として再利用する。

## F05/F08への追加事項

### Named失敗時の状態上書き

provisionNamedTunnelは不正hostnameやprovision失敗時にfallbackStateを呼び、chooseQuickTunnelで保存stateをQuickへ置換する。返却はok:true / fallback:true / errorとなる。これはsourceの互換挙動だが、統合版Mac常駐ではNamed成功と混同せず、既存のNamed bindingを失敗だけで失わない設計とする。

統合adapterの契約: 要求されたmodeの成否と代替案を分ける。既存Named stateは失敗時に保全し、Quick切替は明示的な操作とする。失敗情報は現在設定とは別に保存する。自動復旧を理由に認証・DNS・接続方式を変更しない。

### 外部操作前のpreflight

hostname overrideがある経路ではzoneのnormalizeがlogin/create/routeDnsより後のstate保存時に行われる。統合版はzone/hostname/対象Workspace/許可されたTunnelを全て外部操作より前に検証する。途中失敗時の外部残存資源を記録し、自動削除で帳尻を合わせない。

### 既存DNSエラーを無条件に成功扱いしない

routeDnsはalready exists等の文字列をbenignと判断するが、それだけでは既存CNAMEが要求したTunnelを指すことは証明できない。実bindingのreadbackが必要。createTunnelも出力中のUUIDを取得できれば終了statusに先立って成功扱いする経路があるため、結果と所有権を確認する。

### stopとrestartの境界

Quick stopはSIGTERM送信後にchild参照を消し、終了完了を待たない。統合Hostは所有するchildの終了観測・有限deadline・再起動競合をfixtureで確認する。SIGTERM無視時に実際の二重起動を再現したとは記録しない。

### stateとidentity

isNamedTunnelReadyは保存されたpreference/name/hostnameの存在を確認するだけで、接続・DNS・所有権の受入ではない。state読取にもschema/Workspace一致の検証を加える。SERVICE_NAMEのc2c-bridgeは機械契約として保持し、表示用PRODUCT_NAMEと区別する。

## Task対応 / Verification

対応: CGW-C2C-006（provision/lifecycle/診断adapter）、CGW-C2C-007（拒否と障害fixture）、CGW-MAC-001（常駐）、CGW-PARITY-001（意図的互換差分）。V-C2C-006/007、V-MAC-001、V-PARITY-001へ上記ケースを含める。

静的本文確認: 実施。test/typecheck/build、実Cloudflare/DNS、停止競合再現、Mac実機: 未実施。全テスト本文・依存・本体接合箇所を含む完全監査はまだ未完了。
