## 概要
スケジュール化 → `schedulingConfig`
再試行 → `jobExecutionsRetryConfig`

ジョブの作成は`json`ファイルを呼ぶ方がおすすめだと感じる。
jsonファイルだから、CLIより書きやすいのが大きい。CLIに直接だとフォーマットが若干違うため、エラーが圧倒的に起きやすい。

## ジョブの作成

### jsonファイルを呼び出す

```
aws iot create-job --cli-input-json file://job-config.json
```
CLIで上記を打ち込むと、ルートディレクトリのjob-config.jsonに書かれてあるジョブが作成される

### CLIに直接打ち込む
もしくは、以下のように直接CLIに書くこともできる
```
aws iot create-job \    
    --job-id scheduledJob-11 \ 
    --targets arn:aws:iot:ap-northeast-1:912841305861:thing/device01 \
    --document file://job-document.json \
    --description "This is a scheduled job." \
    --scheduling-config startTime=2024-06-15T19:00,endTime=2024-06-15T20:00
```

### 対象の変更
`json`ファイルのtargetsプロパティの値を変更する。
配列にモノ・モノのグループのARNを含める。

#### モノ
```
  "targets": ["arn:aws:iot:ap-northeast-1:912841305861:thing/device01"],
```

#### モノのグループ
```
  "targets": ["arn:aws:iot:ap-northeast-1:912841305861:thinggroup/test"],
```

## スケジュール化
`json`ファイルの`schedulingConfig`を変更する。
フォーマットはYYYY-MM-DDThh:mm.

```
  "schedulingConfig": {
    "startTime": "2024-06-14T20:00",
    "endTime": "2024-06-14T21:00"
  },
```

## 再試行
`json`ファイルの`jobExecutionsRetryConfig`を変更する。
選択肢はこれら
`FAILED | TIMED_OUT | ALL`
```
   "jobExecutionsRetryConfig": { 
      "criteriaList": [ 
         { 
            "failureType": "FAILED",
            "numberOfRetries": 5
         }
      ]
   },
```