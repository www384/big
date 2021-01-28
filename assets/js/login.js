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


    // 表单验证
    // 表单验证（
    var form = layui.form
    var layer = layui.layer

    // 自定义了一个叫做 pwd 校验规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        // 校验两次密码是否一致的规则
        repwd: function (value) {
            // 选择类名为reg-box 元素 包裹的 name属性为password 的value的内容
            // 通过形参拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可
            var pwd = $(".reg-box [name=password]").val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        // 1. 阻止默认的提交行为
        e.preventDefault()
        //   // 2. 发起Ajax的POST请求
        // 请求携带的参数data
        var data = { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val()
     }

        $.post('/api/reguser', data, 
        // 请求成功后的回调函数
        function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg(res.message)
            // 模拟点击事件
            $('#link_login').click()
        })
    })

    // 发起登录请求
    $('#form_login').submit(function(e){
         // 1. 阻止默认的提交行为
         e.preventDefault()
        //  发起ajax请求
        $.ajax({
            // 请求地址 之前都会调用，统一拼接请求的根路径
            url:'/api/login',
            // 请求方式
            method:'POST',
            // 快速获取表单中的数据
            data:$(this).serialize(),
            // 请求成功后的回调函数
            success:function(res){
                // 判断返回的status 不等于0请求失败 否则等于0求情成功
                if(res.status !==0){
                    return layer.msg('登录失败')

                }
                layer.msg('登录成功')
                // 将请求成功的token字符串 保存到本地存储中localstorage中 
                localStorage.setItem('token',res.token)
                // 跳转到后台页面
                location.href='/index.html'
            }
        })
    })









})