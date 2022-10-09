
import { S3Client ,PutObjectCommand } from "@aws-sdk/client-s3"; 


export async function  upload(file){
  
    const REGION = "us-east-1";
    const s3Client = new S3Client({ region: REGION,credentials:{
        accessKeyId:"AKIATKIJHNYH3DA7EOGE", 
        secretAccessKey:"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"
    } }); 

    const bucketParams = {
        Bucket:'taste-buds-image-bucket',
        Key:file.name,
        Body: file, 
        ContentType: file.type 
    }
    try {
    await s3Client.send(new PutObjectCommand(bucketParams));
    return "https://taste-buds-image-bucket.s3.amazonaws.com/"+file.name;
    }catch (err) {
        console.log("Error", err);
        return false
    }
} 


