module.exports = {
  //继承的规则
  extends: ["@commitlint/config-conventional"],
  //定义规则
  roles: {
    //type的类型定义：表示git提交的type必须在以下类型范围之内
    "type-enum": [
      //当前验证的错误级别
      2,
      //在什么情况下进行验证
      "always",
      //泛型内容
      [
        "feat", //新功能 feature
        "fix", //修复bug
        "docs", //文档注释
        "style", //代码风格（不影响代码运行的变动）
        "refactor", //重构（既不增加新功能，也不是修复bug）
        "perf", //性能优化
        "test", //增加测试
        "chore", //构建过程或辅助工具的变动
        "revert", //回退
        "build", //打包
      ],
    ],
    //subject大小写不做校验
    "subject-case": [0],
  },
};
