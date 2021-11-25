import AWS from 'aws-sdk';
import multer from 'multer';
import multerS3 from 'multer-s3';
import fs from 'fs';
import { yyyymmdd } from './date';
import { NextFunction, Request, Response } from 'express';
const storage = require('../config/objectstorage.json');

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

const limits = {
  files: 1,
  fileSize: 1 * 1024 * 1024
};

export const upload = multer({ storage: storageS3, limits: limits });

export const uploadFile = (req: Request, res: Response, next: NextFunction) => {
  upload.single('imgfile')(req, res, (err) => {
    if (err) return res.json({ file: false, save: false });
    else next();
  });
};

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
    await S3.upload(
      {
        Bucket: bucket_name,
        Key: object_name,
        ACL: 'public-read',
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
    const data = await S3.listObjectsV2(params).promise();
    return data.Contents;
  },

  deleteObject: async (object_name: string, bucket_name = default_bucket) => {
    // 폴더 삭제일 경우 마지막에 '/' 붙어야 한다.
    await S3.deleteObject({
      Bucket: bucket_name,
      Key: object_name
    }).promise();
  }
};
