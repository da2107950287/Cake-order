import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const cart = JSON.parse(localStorage.getItem("cart"))
export default new Vuex.Store({
    state: {
        userInfo: {
            username: sessionStorage.getItem("username")
        },
        cart: cart ? cart : [],
        // checkAllStatus: '',
        // changableNum: 1,
        count: 0,
        disabled: true,
        all_selsect: true, //全选状态
    },
    mutations: {
        setUserInfo(state, username) {
            sessionStorage.setItem("username", username)
            state.userInfo.username = username
        },
        removeUserInfo(state) {
            sessionStorage.removeItem("username");
            state.userInfo.username = null
        },
        addToCart(state, goodsinfo) { //点击加入购物车,保存商品信息
            var flag = false; //假设没有新加入的商品
            state.cart.some(item => {
                console.log("state.cart.some(item => {")
                console.log(state.cart)
                if (item.pid == goodsinfo.pid) {
                    item.count++;
                    flag = true;
                    return true;
                }
                console.log(" if (item.pid == goodsinfo.pid) {")
                console.log(state.cart)
            })

            console.log(state.cart)
            if (!flag) { //添加到购物车
                // Vue.set(goodsinfo, 'count', this.count);
                state.cart.push(goodsinfo);
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        deleteStoreCart(state, id) {
            state.cart.some((item, index) => {
                    if (item.pid == id) {
                        state.cart.splice(index, 1);
                    }
                })
                //保存到本地存储
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },
        //购物车单选
        select(state, productId) {
            let index = state.cart.findIndex(item => {
                return item.pid == productId
            })
            state.cart[index].selected = !state.cart[index].selected
            let flag = state.cart.some((item) => {
                return item.selected == false;

            })
            if (!flag) { //如果全部选中，则全选状态也改变
                state.all_selsect = true
            } else {
                state.all_selsect = false
            }
            // console.log(333)
        },
        // 购物车全选
        // selectall(state) {
        //     // console.log(99999)
        //     state.all_selsect = !state.all_selsect
        //     if (state.all_selsect) {
        //         state.cart.forEach((item) => {
        //             item.selected = true
        //         })
        //         console.log(888);
        //     } else {
        //         state.cart.forEach((item) => {
        //             item.selected = false
        //         })
        //         console.log(777)
        //     }
        // },



        increaseNum(state, id) { //changableNum增加一个数
            state.cart.forEach(item => {
                if (item.pid == id) {
                    item.count++;
                    if (item.count <= 1) {
                        state.count = 1;
                    }
                }

            })

        },
        decreaseNum(state, id) { //changableNum减少一个数        
            state.cart.forEach(item => {
                if (item.pid == id) {
                    item.count--;
                    if (item.count <= 1) {
                        state.count = 1;
                    }
                }
            })
        },
        // Money(state, pid) {
        //     let money1 = [];
        //     // let money2;
        //     console.log(pid)
        //     state.cart.forEach((item) => {
        //         if (item.pid == pid) {
        //             money1[item.id]=0
        //             money1[item.id] += item.count * item.price;
        //             console.log(money1[item.id])
        //         }
        //         // console.log(money1[item.id])
        //         return money1[item.id]

        //     })

        //     // return money1[pid];
        // }

    },
    getters: { //this.$store.getters.xxx
        //获取购物车总数量
        getAllCount(state) {
            var sum = 0;
            state.cart.forEach(item => {
                sum += item.count;
            })
            return sum;
        },

        carList(state) {
            // 初始化全选状态
            if (state.all_selsect) {
                state.cart.forEach((item) => {
                    item.selected = true
                })
            }

            return state.cart
        },

        //获取选中数量和计算商品价格
        // getGoodsSumAndTotal(state) {
        //     var temp = {
        //         sum: 0,
        //         total: 0
        //     }
        //     state.cart.forEach(item => {
        //         // console.log(item.checked)
        //         if (item.checked) {
        //             temp.sum += item.count;
        //             temp.total += (item.ppoint * 100) * temp.sum / 100;
        //         }
        //     })
        //     return temp;
        // },
        // changeNumber0: function() {
        //     if (this.$refs.carouselinp.value == 1) {
        //       this.$refs.carouselinp.value = 1;
        //     } else {
        //       this.$refs.carouselinp.value = Number(this.$refs.carouselinp.value) - 1;
        //       this.$refs.pricechange.innerText =
        //         Number(this.$refs.pricechange.innerText) - Number(this.tempchange);
        //     }
        //   },
        allMoney(state) {
            console.log(22)
            let all_money = 0;
            state.cart.forEach((item) => {
                console.log(item.select)
                console.log(item)
                if (item.selected) {
                    all_money += item.count * item.price;
                }
            })
            console.log(all_money);
            return all_money
        },
    },
    actions: {

    }

})