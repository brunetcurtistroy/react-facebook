import {
	AppstoreOutlined,
	HeartOutlined,
	AlipayCircleOutlined,
	SettingOutlined,
} from "@ant-design/icons";

const MenuList = [
  // 1 基本情報
	{
		"title": "基　本　情　報",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "受診者の情報",
				"submenu": [
					{
						"title": "保険者情報保守",
						"path": "/insurer-info-maintain/insurer-info-maintain",
					},
					{
						"title": "事業所情報保守",
						"path": "/office-info-maintain-directly/office-info-maintain",
					},
					{
						"title": "個人情報保守",
						"path": "/personal-info-maintain-directly/personal-info-maintain",
					},
				]
			},
			{
				"title": "契約の情報",
				"submenu": [
					{
						"title": "契約情報登録",
						"path": "/contract-info-maintain/contract-info-maintain",
					},
					{
						"title": "契約情報一括処理",
						"path": "/contract-info-batch-process/contract-info-batch-process",
					},
					{
						"title": "受診情報再構成",
						"path": "/consult-info-reconstruction/consult-info-reconstruction",
					},
					{
						"title": "セット情報マスタ",
						"path": "/set-info-maintain/set-info-maintain",
					},
					{
						"title": "契約履歴一括作成",
						"path": "/creating-contract-history-together/create-contract-history-together",
					},
				]
			},
			{
				"title": "受診者情報をまとめて変更",
				"submenu": [
					{
						"title": "個人番号統合",
						"path": "/personal-number-integration/personal-number-integration",
					},
					{
						"title": "個人番号変更",
						"path": "/personal-number-migration/personal-number-migration",
					},
					{
						"title": "部署変更一括",
						"path": "/department-change-once/department-change-once",
					},
				]
			}
		]
	},
  // 2 予約業務
	{
		"title": "予　約　業　務",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "予約の人数や空きを確認",
				"submenu": [
					{
						"title": "予約状況検索",
						"path": "/reserve-status-search/reserve-status-search",
					},
				]
			},
			{
				"title": "形態に合わせた予約登録",
				"submenu": [
					{
						"title": "団体予約",
						"path": "/group-bookings/group-bookings",
					},
					{
						"title": "枠取予約",
						"path": "/frame-reserve/frame-reserve",
					},
					{
						"title": "個人予約",
						"path": "/personal-reserve-process/personal-reserve-process",
					},
				]
			},
			{
				"title": "予約をまとめて変更",
				"submenu": [
					{
						"title": "予約一括変更",
						"path": "/reserves-bulk-changes/reserves-bulk-changes",
					},
				]
			},
			{
				"title": "受診者を検索",
				"submenu": [
					{
						"title": "受診者検索",
						"path": "/examinee-search/examinee-search",
					},
				]
			}
		]
	},
  // 3 事前準備
	{
		"title": "事　前　準　備",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "案内状や伝票の準備",
				"submenu": [
					{
						"title": "資料管理保守",
						"path": "/document-manage-maintain/document-manage-maintain",
					},
					{
						"title": "予約関連資料出力",
						"path": "/document-batch-create/create-document-batch",
					},
					{
						"title": "受診情報一覧表",
						"path": "/consult-info-list/consult-info-list",
					},
				]
			},
		]
	},
  // 4 連携関連
	{
		"title": "連　携　関　連",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "標準検査連携",
				"submenu": [
					{
						"title": "検査依頼メイン",
						"path": "/inspect-request-main/inspect-request-main",
					},
					{
						"title": "査結果データ取込",
						"path": "/inspect-acquisition-update-customized-version/inspect-acquisition-update-customized-version",
					},
          {
            "title": "オンライン指示",
						"path": "/online-instruction/online-instruction",
          },
					{
						"title": "検査値変換",
						"path": "/inspect-item-convert-internal/inspect-item-convert-internal",
					},
					{
						"title": "検査依頼変更マスタ保守",
						"path": "/inspect-request-convert-master-maintain/inspect-request-convert-master-maintain",
					},
				]
			},
			{
				"title": "OCR処理",
				"submenu": [
					{
						"title": "OCRデータ取込",
						"path": "/ocr-capture-start-up/ocr-capture-start-up",
					},
				]
			},
			{
				"title": "患者連携",
				"submenu": [
					{
						"title": "患者情報取込[画面]",
						"path": "/patient-info-capture-screen/patient-info-capture-screen",
					},
				]
			},
			{
				"title": "Mirais連携",
				"submenu": [
					{
						"title": "Mirais電子カルテ送信",
						"path": "/mirais-electronic-medical-records-sent/mirais-electronic-medical-records-sent",
					},
					{
						"title": "Mirais単体送信",
						"path": "/mirais-single-transmission/mirais-single-transmission",
					},
				]
			},
			{
				"title": "SSI連携",
				"submenu": [
					{
						"title": "[E-ｶﾙﾃ]一括送信",
						"path": "/e-medical-records-batch-transmission/e-medical-records-batch-transmission",
					},
					{
						"title": "[E-ｶﾙﾃ]単体送信",
						"path": "/e-medical-records-single-transmission/e-medical-records-single-transmission",
					},
					{
						"title": "[E-ｶﾙﾃ]検査依頼保守",
						"path": "/e-medical-records-inspect-request-maintain/e-medical-records-inspect-request-maintain",
					},
				]
			},
			{
				"title": "バッチ処理",
				"submenu": [
					{
						"title": "常駐処理［患者］",
						"path": "/",
					},
					{
						"title": "常駐処理［取込］",
						"path": "/",
					},
				]
			},
		]
	},
  // 5 受付業務
	{
		"title": "受　付　業　務",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "受け、窓口入金・領収書",
				"submenu": [
					{
						"title": "窓口",
						"path": "/counter/counter",
					},
				]
			},
			{
				"title": "まとめて受付",
				"submenu": [
					{
						"title": "受付処理（一括）",
						"path": "/acceptance-batch-process/acceptance-batch-process",
					},
				]
			},
			{
				"title": "通過管理",
				"submenu": [
					{
						"title": "通過管理進捗状況",
						"path": "/passing-manage-progress/passing-manage-progress",
					},
					{
						"title": "通過管理設定",
						"path": "/passing-manage-settings/passing-manage-settings",
					},
					{
						"title": "通過管理一括抽出",
						"path": "/passing-manage-batch-extract/passing-manage-batch-extract",
					},
				]
			},
		]
	},
  // 6 入力業務
	{
		"title": "入　力　業　務",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "受診者の全検査を入力・修正",
				"submenu": [
					{
						"title": "個人単位入力（一覧選択）",
						"path": "/examinee-list/examinee-list",
					},
					{
						"title": "スプレッド入力",
						"path": "/spread-input/spread-input",
					},
					{
						"title": "未入力チェック",
						"path": "/not-input-check-category/not-input-check-category",
					},
					{
						"title": "一括判定",
						"path": "/collect-judge/collect-judge",
					},
					{
						"title": "進捗状況設定",
						"path": "/progress-setting/progress-set",
					},
				]
			},
			{
				"title": "読影",
				"submenu": [
					{
						"title": "読影所見入力",
						"path": "/radiography-finding-input/radiography-finding-input",
					},
					{
						"title": "読影所見送信",
						"path": "/radiography-findings-submit/radiography-findings-submit",
					},
					{
						"title": "読影判定保守",
						"path": "/radiography-judge-maintain/radiography-judge-maintain",
					},
					{
						"title": "読影者情報保守",
						"path": "/radiologists-info-maintain/radiography-info-maintain",
					},
					{
						"title": "読影検査保守",
						"path": "/radiography-inspect-maintain/radiography-inspect-maintain",
					},

				]
			},
		]
	},
	// 07結果出力
	{
		"title": "結　果　出　力",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "結果表の一括出力",
				"submenu": [
					{
						"title": "結果表一括出力（コース別自動選択）",
						"path": "/results-tbl-collect-output/result-tbl-batch-create",
					},
				]
			},
			{
				"title": "事業所向け結果連名簿",
				"submenu": [
					{
						"title": "結果連名簿作成",
						"path": "/communication-roster-output/communication-roster-output",
					},
					{
						"title": "労基５２条様式",
						"path": "/romoto-article52/romoto-article52",
					},
				]
			},
			{
				"title": "発送管理",
				"submenu": [
					{
						"title": "発送管理",
						"path": "/dispatch-manage/dispatch-manage",
					},
				]
			},
			{
				"title": "CSV形式の出力",
				"submenu": [
					{
						"title": "健診データ出力「CSV」",
						"path": "/medical-exam-data-output-csv/medical-exam-data-output-csv",
					},
				]
			},
			{
				"title": "設定",
				"submenu": [
					{
						"title": "印刷パラメータ保守",
						"path": "/print-param-maintain/print-param-maintain",
					},
					{
						"title": "結合様式設定",
						"path": "/binding-mode-setting/binding-mode-setting",
					},
					{
						"title": "コース別標準様式設定",
						"path": "/course-specific-stard-style-setting/course-specific-stard-style-setting",
					},
					{
						"title": "CSV作成パラメータ保守",
						"path": "/csv-create-param-maintain/csv-create-param-maintain",
					},
				]
			}
		]
	},
	// 08会計業務
	{
		"title": "会　計　業　務",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "請求書発行",
				"path": "/invoice/invoice",
			},
			{
				"title": "請求統合",
				"path": "/billing-integration/billing-integration",
			},
			{
				"title": "団体入金",
				"path": "/organizations-payment/organizations-payment",
			},
			{
				"title": "入出金問合せ",
				"path": "/deposit-withdrawal-inquiry/deposit-withdrawal-inquiry",
			},
			{
				"title": "請求問合せ",
				"path": "/billing-inquiry/billing-inquiry",
			},
			{
				"title": "入出金一覧表",
				"path": "/deposit-withdrawal-list-output-instruction/deposit-withdrawal-list-output-instruction",
			},
			{
				"title": "入出金一覧出力",
				"path": "/payment-list-output/payment-list-output",
			},
			{
				"title": "未収金一覧表出力指示",
				"path": "/accounts-receivable-list-output-instruction/accounts-receivable-list-output-instruction",
			},
			{
				"title": "領収書事前発行",
				"path": "/receipt-pre-issue20/receipt-pre-issue",
			},
			{
				"title": "請求管理台帳",
				"path": "/billing-manage-ledger-instruction/billing-manage-ledger-instruction",
			},
		]
	},
	// 09紹介状
	{
		"title": "紹　　介　　状",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "紹介状の作成",
				"submenu": [
					{
						"title": "紹介状抽出",
						"path": "/introduce-letter-extract/introduce-letter-extract"
					},
					{
						"title": "紹介状発行",
						"path": "/introduce-letter-issued-main/introduce-letter-issued-main"
					},
					{
						"title": "要精検者紹介状発行",
						"path": "/person-require-exam-introduce-letter/person-require-exam-introduce-letter"
					},
				]
			},
			{
				"title": "返送結果の登録",
				"submenu": [
					{
						"title": "おたずね発行",
						"path": "/ask-issued/ask-issued"
					},
					{
						"title": "紹介状返送情報入力",
						"path": "/introduce-letter-return-info-input/introduce-letter-return-info-input"
					}
				]
			},
			{
				"title": "紹介状各種マスタ設定",
				"submenu": [
					{
						"title": "紹介状マスタ",
						"path": "/introduce-letter-master-maintain/introduce-letter-master-maintain"
					}
				]
			}
		]
	},
	// 10検査保守
	{
		"title": "検　査　保　守",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "検査基本設定",
				"submenu": [
					{
						"title": "検査項目マスタ",
						"path": "/inspect-item-master/inspect-item-master"
					},
					{
						"title": "カテゴリ検査項目マスタ",
						"path": "/another-inspect-item-setting-category/another-inspect-item-setting-category"
					},
					{
						"title": "カテゴリーマスタ保守",
						"path": "/category-master-maintain/category-master-maintain"
					},
					{
						"title": "コース基本種別設定",
						"path": "/course-basic-type-setting/course-basic-type-setting"
					},
				]
			},
			{
				"title": "検査結果選択設定",
				"submenu": [
					{
						"title": "検査コメント情報保守",
						"path": "/exam-cmt-info-maintain/inspect-cmt-info-maintain"
					},
					{
						"title": "部位所見マスタ",
						"path": "/site-findings-master-maintain/site-findings-master-maintain"
					},
					{
						"title": "注意。指導コメント",
						"path": "/caution-guide-matter-cmt-maintain/another-guide-cmt-maintain-category"
					},
					{
						"title": "病名マスタ保守",
						"path": "/disease-name-master-maintain/disease-name-master-maintain"
					},
				]
			},
			{
				"title": "検査自動処理設定",
				"submenu": [
					{
						"title": "検査値自動計算保守",
						"path": "/inspect-value-calculate-auto-maintain/inspect-value-calculate-auto-maintain"
					},
					{
						"title": "検査基準値設定",
						"path": "/inspect-ref-value-setting/inspect-ref-value-setting"
					},
					{
						"title": "検査項目判定値マスタ",
						"path": "/inspect-item-judge-value-setting/inspect-item-judge-value-setting"
					},
					{
						"title": "判定レベル変換マスタ保",
						"path": "/determine-level-modify/determine-level-modify-master-coercive"
					},
					{
						"title": "正常値設定保守",
						"path": "/normal-value-setting-maintain/normal-value-setting"
					},
					{
						"title": "条件式コメント設定",
						"path": "/condition-express-cmt-setting/condition-express-cmt-setting"
					},
				]
			}
		]
	},
	// 11統計業務
	{
		"title": "統　計　業　務",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "総合判定分類表",
				"path": "/comprehensive-judge-classify-tbl/comprehensive-judge-classify-tbl"
			},
			{
				"title": "カテゴリ判定分類表",
				"path": "/category-determining-classify-tbl/category-determining-classify-tbl"
			},
			{
				"title": "項目判定分類表",
				"path": "/item-judge-classify-tbl/item-judge-classify-tbl"
			},
			{
				"title": "事業所受診実績状況",
				"path": "/office-visits-achievement-situation/office-visits-achievement-situation"
			},
			{
				"title": "検査変動情報出力",
				"path": "/inspect-variation-info-output/inspect-variation-info-output"
			},
			{
				"title": "個人情報CSV出力",
				"path": "/personal-info-csv-output/personal-info-csv-output"
			},
			{
				"title": "事業所情報CSV出力",
				"path": "/office-info-csv-output/office-info-csv-output"
			},
			{
				"title": "マスター覧出力",
				"path": "/master-list-output/master-list-output"
			},
		]
	},
	// 12ユーザーツール
	{
		"title": "ユーザーツール",
		"icon": <AppstoreOutlined />,
		"submenu": [
			{
				"title": "ユーザー帳票出力",
				"path": "/user-form-output/user-form-output"
			},
			{
				"title": "帳票作成・編集",
				"path": "/form-create-editing/form-create-editing"
			},
			{
				"title": "ユーザー帳票項目保守",
				"path": "/user-document-item-maintain/user-document-item-maintain"
			},
		]
	},
  // 13 特定健診
	{
		"title": "特　定　健　診",
		"icon": <HeartOutlined />,
    "submenu": [
      {
        title: "受診券入力処理[一覧]",
        path: "/consult-ticket-input-process-list/consult-ticket-input-process-list"
      },
      {
        title: "特定健診決済処理",
        path: "/specific-medical-exam-settle-process/specific-medical-exam-settle-process"
      },
      {
        title: "特健データXML出力",
        path: "/specific-health-data-xml-output/specific-health-data-xml-output"
      },
      {
        title: "初回面談対象判定処理",
        path: "/init-interview-target-determine-process/init-interview-target-determine-process"
      }
    ]
	},
  // 14 特保指導
	{
		"title": "特　保　指　導",
		"icon": <HeartOutlined />,
    "submenu": [
      {
        "title": "保健指導登録",
        "submenu": [
          {
            "title": "指導初回入力",
            "path": "/insure-guide-init-input/insure-guide-init-input"
          },
          {
            "title": "実施入力",
            "path": "/insure-guide-input/insure-guide-input"
          }
        ]
      },
      {
        "title": "請求処理",
        "submenu": [
          {
            "title": "利用券入力処理",
            "path": "/vouchers-input-process-list/vouchers-input-process-list"
          },
          {
            "title": "特定保健指導ＸＭＬ出力",
            "path": "/specific-coercive-finger-xml-output/specific-insure-xml-output"
          },
          {
            "title": "特定保健指導決済処理",
            "path": "/init-interview-target-determine-process/init-interview-target-determine-process"
          }
        ]
      }
    ]
	},
    // 15 特保保守
    {
      "title": "特　保　保　守",
      "icon": <HeartOutlined />,
      "submenu": [
        {
          "title": "実施者マスタ",
          "path": "/implementor-master/implementor-master"
        },
        {
          "title": "実施場所マスタ",
          "path": "/implementation-location-master/implement-location-master"
        },
        {
          "title": "保健指導コース",
          "path": "/insure-guide-course/insure-guide-course"
        },
        {
          "title": "文章マスタ",
          "path": "/sentence-master/sentence-master"
        },
        {
          "title": "検査コメントマスタ",
          "path": "/inspect-cmt-master/inspect-cmt-master"
        },
        {
          "title": "支援項目",
          "path": "/support-item/support-item"
        },
        {
          "title": "検査項目マスタ",
          "path": "/inspect-item-master/inspect-item-master"
        },
        {
          "title": "文章分類マスタ",
          "path": "/document-classify-master/document-classify-master"
        },
        {
          "title": "実施区分マスタ",
          "path": "/implementation-division-master/implement-division-master"
        },
        {
          "title": "実施機関マスタ",
          "path": "/implement-agencies-master/implement-agencies-master"
        },
        {
          "title": "特健特保パラメータ保守",
          "path": "/specific-health-tokuho-param-maintain/specific-health-tokuho-param-maintain"
        },
        {
          "title": "ＸＭＬパラメータ保守",
          "path": "/xml-param-maintain/xml-param-maintain"
        },
        {
          "title": "契約マスタ保守",
          "path": "/contract-master-maintain/contract-master-maintain"
        },
        {
          "title": "取りまとめ区分",
          "path": "/compiled-classify/compiled-classify"
        },
        {
          "title": "契約取りまとめ保守",
          "path": "/contract-compiled-maintain/contract-compiled-maintain"
        },
        {
          "title": "特健特保オプション設定",
          "path": "/specific-health-tokuho-options-file/specific-health-tokuho-options-file"
        },
        {
          "title": "ＪＬＡＣ１０コードマスタ",
          "path": "/xml-medical-exam-item-master/xml-medical-exam-item-master"
        },
        {
          "title": "データ範囲チェック",
          "path": "/data-range-check/data-range-check"
        }
      ]
    },
  // 16 協会けんぽ報告
	{
		"title": "協会けんぽ報告",
		"icon": <AlipayCircleOutlined />,
		"submenu": [
			{
				"title": "協会提供ツール取込用データ",
				"submenu": [
					{
						"title": "協会けんぽデータ作成",
						"path": "/associate-insure-data-create/associate-insure-data-create"
					},
					{
						"title": "協会けんぽ受け情報訂正",
						"path": "/association-acceptance-info-correct/association-acceptance-info-correct"
					},
					{
						"title": "協会けんぽ必要項目",
						"path": "/associate-insure-required-item/associate-insure-required-item"
					},
				]
			},
			{
				"title": "資格確認",
				"submenu": [
					{
						"title": "協会けんぽ資格確認",
						"path": "/associate-insure-qualify-confirm/associate-insure-qualify-confirm"
					},
				]
			},
			{
				"title": "設定",
				"submenu": [
					{
						"title": "協会けんぽ契約金額変更",
						"path": "/associate-insure-money-amount-setting/associate-insure-money-amount-setting"
					},
					{
						"title": "協会けんぽ設定",
						"path": "/associate-insure-param-maintain/associate-insure-param-maintain"
					},
				]
			},
		]
	},
  // 17 システム保守
	{
		"title": "システム保守",
		"icon": <SettingOutlined />,
		"submenu": [
			{
				"title": "施設・消費税設定",
				"path": "/facility-consumption-tax-setting/facility-consumption-tax-setting"
			},
			{
				"title": "予約表示項目設定",
				"path": "/reserves-display-item-setting/reserves-display-item-setting"
			},
			{
				"title": "基準人数設定情報",
				"path": "/ref-people-num-setting-info/ref-people-num-setting-info"
			},
			{
				"title": "基本時間帯",
				"path": "/basic-period-time/basic-period-time"
			},
			{
				"title": "特定日人数設定",
				"path": "/specific-date-people-num-setting/specific-date-people-num-setting"
			},
			{
				"title": "休診日設定",
				"path": "/non-consult-date-setting/non-consult-date-setting"
			},
			{
				"title": "進捗情報保守",
				"path": "/progress-info-maintain/progress-info-maintain"
			},
			{
				"title": "施設(院内/外)情報保守",
				"path": "/facility-create-hospital-outside-create-info-maintain/facility-hospital-outside-info-maintain"
			},
			{
				"title": "年齢管理情報保守",
				"path": "/age-manage-info-maintain/age-manage-info-maintain"
			},
			{
				"title": "プリンタ情報保守",
				"path": "/printer-info-maintain/printer-info-maintain"
			},
			{
				"title": "ﾕｰｻﾞｰｵﾌﾟｼｮﾝ情報保守",
				"path": "/user-option-info-maintain/user-option-info-maintain"
			},
			{
				"title": "ﾕｰｻﾞｰﾊﾟﾗﾒｰﾀ保守",
				"path": "/user-param-maintain/user-param-maintain"
			},
		]
	},
];

export default MenuList;
