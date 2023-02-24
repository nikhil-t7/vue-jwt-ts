import { shallowMount,flushPromises } from "@vue/test-utils";
import DashboardCom from "@/components/DashboardCom.vue";
import { createStore } from 'vuex'

describe('DashBoardCom.vue',() => {
    it('renders the user Name and user Id is Dashboard using getters', () => {

        const authData = {
            userId: "userId",
            userName: "userName",
        }
        let getters = {
            getAuthData: jest.fn().mockReturnValue(authData),
        }

        let store = createStore({
            modules: {
                auth: {
                    namespaced: true,
                    getters,
                },
            },
        })

        let wrapper = shallowMount(DashboardCom, {
            global: {
                plugins: [store]
            },
        })

        //await flushPromises() 
        //console.log(wrapper.html())
        //console.log(wrapper.find('#userName').text())
        expect(wrapper.find('#userName').text()).toContain("userName")
        expect(wrapper.find('#userId').text()).toContain("userId")
    })
})