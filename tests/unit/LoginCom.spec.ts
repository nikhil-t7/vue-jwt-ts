import { mount,flushPromises  } from "@vue/test-utils";
import LoginCom from "@/components/LoginCom.vue";
import { createStore } from 'vuex'

describe("LoginCom", () => {

    let wrapper: any
    let store: any
    let actions: any
    let getters: any
    let mockRouter : any
    beforeEach(() => {

        mockRouter = {
            push : jest.fn()
        }

        actions = {
            login: jest.fn()
        }

        getters = {
            getLoginStatus: () => 'success',
        }

        store = createStore({
        modules: {
            auth: {
                namespaced: true,
                actions,
                getters,
            },
        },
        })

        wrapper = mount(LoginCom, {
        global: {
            plugins: [store],
            mocks:{
                $router: mockRouter 
            }
        },
        })
    })

it("displays the login form", () => {
    const wrapper = mount(LoginCom);
    expect(wrapper.find("form").exists()).toBe(true);
    expect(wrapper.find("h3").text()).toBe("Login");
    expect(wrapper.find('label[for="userName"]').text()).toBe("User Name");
    expect(wrapper.find('input[type="text"]').exists()).toBe(true);
    expect(wrapper.find('label[for="password"]').text()).toBe("Password");
    expect(wrapper.find('input[type="password"]').exists()).toBe(true);
    expect(wrapper.find("button").text()).toBe("Login");
});

it("calls the login action when the login button is clicked and ", async () => {

    await wrapper.find('input[type="text"]').setValue("user");
    await wrapper.find('input[type="password"]').setValue("123114");
    await wrapper.find("button").trigger("click");

    await flushPromises()

    expect(actions.login).toHaveBeenCalled()
});

    it("redirects to the dashboard if the login succeeds", async () => {
        await wrapper.find('input[type="text"]').setValue("user");
        await wrapper.find('input[type="password"]').setValue("123114");
        await wrapper.find("button").trigger("click");

        await flushPromises()

        expect(mockRouter.push).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledWith('/dashboard')
    });

    it("displays an error message if the login fails", async () => {
        let mockRouter = {
            push : jest.fn()
        }

        let actions = {
            login: jest.fn()
        }

        let getters = {
            getLoginStatus: () => 'failure',
        }

        let store = createStore({
            modules: {
                auth: {
                    namespaced: true,
                    actions,
                    getters,
                },
            },
        })

        wrapper = mount(LoginCom, {
        global: {
            plugins: [store],
            mocks:{
                $router: mockRouter 
            }
        },
        })
        await wrapper.find('input[type="text"]').setValue("user");
        await wrapper.find('input[type="password"]').setValue("123114");
        await wrapper.find("button").trigger("click");

        await flushPromises()
        
        expect(wrapper.find(".alert-danger").exists()).toBe(true);
        expect(wrapper.find(".alert-danger").text()).toBe("Login Failed. Try Again.");
});

});
