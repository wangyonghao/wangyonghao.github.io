1. JSR303/JSR-349: JSR303是一项标准,只提供规范不提供实现，规定一些校验规范即校验注解，如@Null，@NotNull，@Pattern，位于javax.validation.constraints包下。JSR-349是其的升级版本，添加了一些新特性。
   - @Null 被注释的元素必须为null
   - @NotNull 被注释的元素必须不为null
   - @AssertTrue 被注释的元素必须为true
   - @AssertFalse 被注释的元素必须为false
   - @Min(value) 被注释的元素必须是一个数字，其值必须大于等于指定的最小值
   - @Max(value) 被注释的元素必须是一个数字，其值必须小于等于指定的最大值
   - @DecimalMin(value) 被注释的元素必须是一个数字，其值必须大于等于指定的最小值
   - @DecimalMax(value) 被注释的元素必须是一个数字，其值必须小于等于指定的最大值
   - @Size(max, min) 被注释的元素的大小必须在指定的范围内
   - @Digits (integer, fraction) 被注释的元素必须是一个数字，其值必须在可接受的范围内
   - @Past 被注释的元素必须是一个过去的日期
   - @Future 被注释的元素必须是一个将来的日期
   - @Pattern(value) 被注释的元素必须符合指定的正则表达式
2. hibernate validation：hibernate validation是对这个规范的实现，并增加了一些其他校验注解，如@Email，@Length，@Range等等
   - @Email 被注释的元素必须是电子邮箱地址
   - @Length 被注释的字符串的大小必须在指定的范围内
   - @NotEmpty 被注释的字符串的必须非空
   - @Range 被注释的元素必须在合适的范围内