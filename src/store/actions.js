import {request} from '../NetWork/request'
export default {
    getUserlist(context) {
        console.log(context)
        request({
            url: "/users",
            params: state.queryInfo,
        }).then((value) => {
            if (value.meta.status !== 200) {
                return this.$message.error("用户数据请求失败");
            } else {
                state.total = value.data.total
                state.userList = value.data.users;
                state.total = value.data.total;
            }
        });
    }
}