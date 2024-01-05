export default {
  // 获取
  getItem: (key: any) => {
    const value = localStorage.getItem(key) || "";
    let res = "";
    try {
      res = JSON.parse(value);
    } catch (err) {
      res = value;
    }
    return res;
  },
  // 缓存
  setItem: (key: any, val: any) => {
    localStorage.setItem(key, JSON.stringify(val));
  },
  // 指定清除
  removeItem: (key: any) => {
    localStorage.removeItem(key);
  },
  // 全部清除
  clear: () => {
    localStorage.clear();
  },
};
