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
  $('#from-reg').on('submit', function (e) {
    // 阻止表单默认事件
    e.preventDefault()
    // 发起Ajax的POST请求
    $.post('/api/reguser', { username: $('#from-reg [name=username]').val(), password: $('#from-reg [name=password]').val() }, function (res) {
      if (res.status !== 0) {
        return layer.msg(res.message)
      }
      layer.msg('注册成功')
      // 模拟人的点击行为
      $('#link_login').click()
    })
  })

  // 监听登录表单的注册事件
  $('#form_login').on('submit', function (e) {
    // 阻止默认行为
    e.preventDefault()
    // 发起ajax的post请求
    $.ajax({
      url: '/api/login  ',
      method: 'POST',
      // 快速获取表单中的数据
      data: $(this).serialize(), //serialize
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('登录失败!')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token', res.token)
        // 跳转到主页
        location.href = '/index.html'
      }
    })
  })
})
