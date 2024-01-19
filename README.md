## Cloud Translation APIを使う

### サービスを有効化する

```
gcloud services list | grep translate.googleapis.com
```

```
gcloud services enable translate.googleapis.com
```

### サービスアカウントを作成する

```
gcloud iam service-accounts create translate-api-user \
    --description="Cloud Translation API実行用" \
    --display-name="translate-api-user"
```

```
gcloud projects add-iam-policy-binding $PROJECT_ID \
    --member=serviceAccount:$SERVICE_ACCOUNT \
    --role=roles/cloudtranslate.user
```

### 構成ファイルをダウンロードする

```
gcloud iam workload-identity-pools create-cred-config \
    projects/$PROJECT_NUMBER/locations/$REGION/workloadIdentityPools/$WORKLOAD_POOL_ID/providers/$PROVIDER_ID \
    --service-account=$SERVICE_ACCOUNT \
    --aws \
    --output-file=credentials.json
```

