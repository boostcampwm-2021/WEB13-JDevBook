import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import fs from 'fs';
import { yyyymmdd } from './date';
const storage = require('../config/objectstorage.json');

//const endpoint: AWS.Endpoint = new AWS.Endpoint(storage.url);
const url: string = storage.url;
const region: string = storage.region;
const access_key: string = storage.access_key;
const secret_key: string = storage.secret_key;
const default_bucket: string = storage.default_bucket_name;

const S3 = new AWS.S3({
  endpoint: url,
  region: region,
  credentials: {
    accessKeyId: access_key,
    secretAccessKey: secret_key
  }
});

const storageS3 = multerS3({
  s3: S3,
  bucket: default_bucket,
  contentType: multerS3.AUTO_CONTENT_TYPE,
  acl: 'public-read',
  key: (req, file, callback) => {
    callback(
      null,
      `${req.session.username}/${yyyymmdd}/${Date.now()}_${file.originalname}`
    );
  },
  serverSideEncryption: 'AES256'
});

export const upload = multer({ storage: storageS3 });

export const objectStorage = {
  makeBucket: async (bucket_name: string) => {
    await S3.createBucket({
      Bucket: bucket_name,
      CreateBucketConfiguration: {}
    }).promise();
  },

  getBucketlist: async () => {
    // { Name: ~, CreationDate: ~}
    const { Buckets } = await S3.listBuckets().promise();
    return Buckets;
  },

  deleteBucket: async (bucket_name: string) => {
    await S3.deleteBucket({
      Bucket: bucket_name
    }).promise();
  },
  // 폴더만 만들때인데 이럴 일이 있을지는 모르겠다...
  uploadObjectfolder: async (
    object_name: string,
    bucket_name = default_bucket
  ) => {
    // object_name = 'test1/'
    if (object_name[object_name.length - 1] !== '/')
      object_name = object_name + '/';

    await S3.putObject({
      Bucket: bucket_name,
      Key: object_name
    }).promise();
  },

  uploadObjectfile: async (
    object_name: string,
    local_file_path: string,
    bucket_name = default_bucket
  ) => {
    // object_name = 'test5/5-1/testfile.png'
    // local_file_path = '../models/erd-workbench.png'
    // npm start로 상대경로와 절대경로 테스트는 안해봄
    // 덮어쓰기 가능
    await S3.upload(
      {
        Bucket: bucket_name,
        Key: object_name,
        ACL: 'public-read', // console.ncloud에서 보기 가능
        Body: fs.createReadStream(local_file_path)
      },
      { partSize: 15 * 1024 * 1024 }
    ).promise();
  },

  getObjectlist: async (max_keys: number, bucket_name = default_bucket) => {
    const params = {
      Bucket: bucket_name,
      MaxKeys: max_keys
    };
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#listObjectsV2-property
    const data = await S3.listObjectsV2(params).promise();
    return data.Contents;
  },

  //https://kr.object.ncloudstorage.com/jdevbook/test5/5-1/testfile.png
  //ACL설정 추가는 https://guide.ncloud-docs.com/docs/storage-storage-8-4 참고

  deleteObject: async (object_name: string, bucket_name = default_bucket) => {
    // 폴더 삭제일 경우 마지막에 '/' 붙어야 한다.
    await S3.deleteObject({
      Bucket: bucket_name,
      Key: object_name
    }).promise();
  }
};

//(async () => await objectStorage.makeBucket('jdevbook2'))();
//(async () => console.log(await objectStorage.getBucketlist()))();
//(async () => await objectStorage.deleteBucket('jdevbook2'))();
// (async () => await objectStorage.uploadObjectfolder('test14'))();
// (async () =>
//   await objectStorage.uploadObjectfile(
//     'test5/5-3/testfile.png',
//     '../models/erd-workbench.png'
//   ))();
// (async () => console.log(await objectStorage.getObjectlist(10)))();

// (async () => await objectStorage.deleteObject('test5/5-3/testfile.png'))();
// (async () => await objectStorage.deleteObject('test3/'))();
