import crypto from "crypto";

const openSSLCrypto = {
  // create public.der to public.pem KeyString
  getPublicKey: (): string => {
    if (process.env.VUE_APP_PUBLIC_KEY === undefined) return "";
    return process.env.VUE_APP_PUBLIC_KEY;
  },

  /**
   * public 키를 가져와서 암호화
   */
  encode: (text: string): string => {
    // public key 확인
    const publicKey: string = openSSLCrypto.getPublicKey(); //public key를 사용해 암호화한 값을 서버로 전송한다
    //    console.log("PublicKey", publicKey);

    // 클라이언트
    const buffer = Buffer.from(text);
    return crypto.publicEncrypt(publicKey, buffer).toString("base64");
  },

  decode: (text: string): string => {
    // public key 확인
    const publicKey = openSSLCrypto.getPublicKey(); //public key를 사용해 암호화한 값을 서버로 전송한다
    const publicBuffer = Buffer.from(publicKey, "utf8");

    // 클라이언트
    const encrypt = Buffer.from(text, "base64");
    return crypto.publicDecrypt(publicBuffer, encrypt).toString("utf8");
  },
};

export default openSSLCrypto;
