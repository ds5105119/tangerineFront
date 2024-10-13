export interface presignedPostUrl {
  url: string;
  fields: {
    key: string;
    acl: string;
    policy: string;
    'X-Amz-Algorithm': string;
    'X-Amz-Credential': string;
    'X-Amz-Date': string;
    'X-Amz-Signature': string;
    [key: string]: string;
  };
}
