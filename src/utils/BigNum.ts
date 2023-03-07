import BigNumber from "bignumber.js";

function getNumbZero(num: Nullable) {
  let str = "";
  for (let i = 1; i < Math.abs(num); i++) {
    str += "0";
  }
  if (num < 0) return "0." + str;
  else return str + "0";
}

export const formatScientificDecimal = (
  val: Nullable,
  decimalLength: number | undefined
): string => {
  if (val instanceof BigNumber) val = val.toString();
  else val = String(val);

  let result = "";

  if (!val.includes("e")) {
    result = val;
  } else {
    // 包含 e
    const zoomFactor = parseInt(val.substring(val.indexOf("e") + 1)); // 缩放倍数，负数则将小数点前移进行缩小
    const partOfInt = val.substring(
      parseFloat(val) >= 0 ? 0 : 1,
      val.includes(".") ? val.indexOf(".") : val.indexOf("e")
    ); //整数部分
    const partOfDecimal = val.includes(".")
      ? val.substring(val.indexOf(".") + 1, val.indexOf("e"))
      : ""; // 小数部分

    if (zoomFactor < 0) {
      // 小数位向左移
      result = getNumbZero(zoomFactor) + partOfInt + partOfDecimal; // 正数
    } else {
      // 小数位向右移
      const arr = (partOfInt + partOfDecimal + getNumbZero(zoomFactor)).split(
        ""
      );
      arr.splice(zoomFactor + 1, 0, ".");
      result = arr.join("");
    }

    if (parseFloat(val) < 0) result = "-" + result; // 负数

    // console.log('val:', val, ' 缩放倍数:', zoomFactor, ' 整数部分：', partOfInt, ' 小数部分:', partOfDecimal, ' 输出:', result);
  }
  // 小数位控制
  if (result.includes(".")) {
    const partOfinteger = result.substring(0, result.indexOf(".") + 1);
    let partOfDecimal = result.substring(result.indexOf(".") + 1);
    if (decimalLength !== undefined && partOfDecimal.length > decimalLength)
      partOfDecimal = partOfDecimal.substring(0, decimalLength); // 截取前decimalLength位
    // 小数后面的0去掉
    for (let i = partOfDecimal.length - 1; i >= 0; i--) {
      if (partOfDecimal[partOfDecimal.length - 1] === "0")
        partOfDecimal = partOfDecimal.substring(0, i - 1);
    }
    result = partOfinteger + partOfDecimal;
    if (result.slice(-1) === ".")
      result = result.substring(0, result.length - 1); // 没有小数位则去掉小数点
    if (["", "-0"].includes(result)) result = "0";
  }
  // console.log('输入:', val, ' 输出:', result);
  return result;
};

// 数值以逗号隔开
export const displayByComma = (val: Nullable, decimals = 2): string => {
  if (val === Infinity) return "Infinity";

  if (isNaN(Number(val))) return "0";

  if (String(parseFloat(val)).includes("e"))
    return formatScientificDecimal(val, undefined);

  val = parseFloat(val) || 0;
  val = parseFloat((val + "").replace(/[^\d.-]/g, "")).toFixed(decimals) + "";

  const l = val.split(".")[0].split("").reverse();
  const r = val.split(".")[1];
  let t = "";

  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && i + 1 != l.length ? "," : "");
  }
  let res = t.split("").reverse().join("") + "." + r;

  // 去掉多余的0
  if (res.includes(".")) {
    const arr = res.split("");
    for (let i = arr.length - 1; i >= 0; i--) {
      if (arr[i] === "0" && i === arr.length - 1) arr.splice(i, 1);
    }
    if (arr.indexOf(".") === arr.length - 1) arr.splice(-1); // 去掉最后的 .
    res = arr.join("");
  }
  return res;
};

// 获取精度对应的String类型的数值
export function getDecimalNumToStr(decimals: Nullable): string {
  let str = "1";
  for (let i = 0; i < decimals; i++) {
    str += "0";
  }
  return str;
}

/**
 * BigNum 类，将合约返回的值以多种类型、缩放大小存储，具有部分转换方法
 */
export class BigNum {
  /**
   * 构造函数
   * @param {Object} options 配置项
   * @param {String|BigNumber|Number} option.val 要实例化并围绕的数值 required
   * @param {Number|String} options.decimals 精度 required
   * @param {String} options.name 命名 optional
   */

  name: string;
  desc: string;
  decimals: number;
  decimal_str: string;
  decimal_big: Nullable;
  val: string;
  val_big: Nullable;
  val_bigNumber: Nullable;
  val_actual_big: Nullable;
  val_actual_str: string;
  val_actual_num: number;
  val_actual_floor_str: string;
  val_actual_display_2: string;
  val_actual_display_3: string;
  val_actual_display_4: string;

  constructor(options: Nullable) {
    if (options.decimals === undefined)
      throw new Error("The parameter decimals cannot be empty");

    this.name = options.name || "Unnamed bigNum object"; // 命名
    this.desc = options.desc; // 描述
    this.decimals = options.decimals; // 精度
    this.decimal_str = this.getDecimalNumToStr(options.decimals);
    this.decimal_big = new BigNumber(this.decimal_str);
    if (options.val instanceof BigNumber)
      this.val = this.formatScientificDecimal(options.val, undefined); // 原始值
    else this.val = this.formatScientificDecimal(options.val, undefined); // 原始值
    this.val_bigNumber = new BigNumber(this.val);

    this.val_big = new BigNumber(this.val);

    this.val_actual_big = this.val_big.dividedBy(this.decimal_big); // 根据精度调整后的实际的值，BigNumber
    this.val_actual_str = this.val_actual_big.toString(); // 根据精度调整后的实际的值，String
    this.val_actual_num = this.val_actual_big.toNumber(); // 取Number类型
    this.val_actual_floor_str = this.formatScientificDecimal(options.val, 0);

    this.val_actual_display_2 = displayByComma(this.val_actual_str, 2); // 以逗号隔开显示，2位小数
    this.val_actual_display_3 = displayByComma(this.val_actual_str, 3);
    this.val_actual_display_4 = displayByComma(this.val_actual_str, 4);
  }

  // 科学计数法数字转换完整数字
  formatScientificDecimal(
    val: Nullable,
    decimalLength: number | undefined
  ): Nullable {
    return formatScientificDecimal(val, decimalLength);
  }
  getDecimalNumToStr(decimals: number) {
    return getDecimalNumToStr(decimals);
  }
  // 乘
  mul(bigNum: Nullable): BigNum {
    if (["string", "number"].includes(typeof bigNum))
      bigNum = new BigNum({ val: bigNum, decimals: 0 });
    return new BigNum({
      val: this.val_bigNumber.multipliedBy(bigNum.val_bigNumber),
      decimals: this.decimals + bigNum.decimals,
    });
  }
  // 除
  div(bigNum: Nullable): BigNum {
    if (["string", "number"].includes(typeof bigNum))
      bigNum = new BigNum({ val: bigNum, decimals: 0 });
    return new BigNum({
      val: this.val_bigNumber.dividedBy(bigNum.val_bigNumber),
      decimals: this.decimals - bigNum.decimals,
    });
  }
  // 加
  plus(bigNum: Nullable): BigNum {
    if (["string", "number"].includes(typeof bigNum))
      bigNum = new BigNum({ val: bigNum, decimals: 0 });
    if (this.decimals !== bigNum.decimals) {
      throw new Error(
        "The addition and subtraction BigNum needs to have the same accuracy"
      );
    }
    return new BigNum({
      val: this.val_bigNumber.plus(bigNum.val_bigNumber),
      decimals: this.decimals,
    });
  }
  // 减
  minus(bigNum: Nullable): BigNum {
    if (["string", "number"].includes(typeof bigNum))
      bigNum = new BigNum({ val: bigNum, decimals: 0 });
    if (this.decimals !== bigNum.decimals) {
      throw new Error(
        "The addition and subtraction BigNum needs to have the same accuracy"
      );
    }
    return new BigNum({
      val: this.val_bigNumber.minus(bigNum.val_bigNumber),
      decimals: this.decimals,
    });
  }
  // toString() {
  //   return this.val_actual_str
  // }
}
