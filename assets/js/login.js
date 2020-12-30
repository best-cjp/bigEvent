$(function () {
  // 点击“去注册账号”的链接
  $('#link_reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击“去登录”的链接
  $('#link_login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 自定义校验规则
  var form = layui.form
  form.verify({
    pwd: [/^[\S]{6,16}$/, '密码必须为6到12位，且不能为空格'],
    repwd: function (value) {
      var pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码输入不一致'
      }
    }
  })

  // 监听注册表单的提交事件
  $('#from').on('submit', function (e) {
    // 阻止表单默认事件
    e.preventDefault()
    // 发起Ajax的POST请求
    $.post('http://ajax.frontend.itheima.net/api/reguser', { username: '', password: '' }, function (res) {})
  })
})
