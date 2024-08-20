import Mock from 'mockjs';

Mock.mock('/api/login', 'post', (options) => {
    const { username, password } = JSON.parse(options.body);
    if (username === 'admin' && password === '123456') {
        return {
            status: 200,
            message: '登录成功',
            data: {
                token: 'some_token_here',
            },
        };
    } else {
        return {
            status: 400,
            message: '用户名或密码错误',
        };
    }
});

Mock.mock('/api/register', 'post', (options) => {
    const { username, password } = JSON.parse(options.body);
    if (username && password) {
        return {
            status: 200,
            message: '注册成功',
        };
    } else {
        return {
            status: 400,
            message: '用户名或密码不能为空',
        };
    }
});
