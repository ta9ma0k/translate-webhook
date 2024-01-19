variable "gcp_id" {
  type = string
  description = "GCPのプロジェクトID"
}
variable "aws_account_id" {
  type = string 
  description = "AWSのアカウントID"
}
variable "assumed_role_name" {
  type = string
  description = "実行するAWSのIAMロール名"
}
