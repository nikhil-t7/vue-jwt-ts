import { shallowMount } from "@vue/test-utils";
import RegisterCom from "@/components/RegisterCom.vue";

describe('RegisterCom.vue',() => {

    it("submit function is called when form is submitted", () => {
        const wrapper = shallowMount(RegisterCom);
        const form = wrapper.find("form");
        form.trigger("submit");
        expect(wrapper.emitted().submit).toBeTruthy();
    });

    it('shows password when "Show Password" checkbox is clicked', async () => {
        const wrapper = shallowMount(RegisterCom);
        const showPasswordCheckbox = wrapper.find('input[type="checkbox"]');
    
        await showPasswordCheckbox.trigger('click');
    
        expect(wrapper.vm.state.passwordFieldType).toBe('text');
    });

    it('shows an error message when a required field is empty' , async () => {
        const last_name = 'testName'
        const email = 'test@gmail.com'
        const password = 'testPass@1'
        const password_confirm = 'testPass@1'
        const wrapper = shallowMount(RegisterCom);

        await wrapper.find("input[type=text][placeholder='Last Name']").setValue(last_name)
        await wrapper.find("input[type=email][placeholder='Email']").setValue(email)
        await wrapper.find('input[type=password][placeholder=Password]').setValue(password)
        await wrapper.find("input[type=password][placeholder='Confirm Password']").setValue(password_confirm)
        await wrapper.find('form').trigger('submit.prevent')
        
        expect(wrapper.find('.text-danger').text()).toContain('First Name is required')

    })

    it('submit form when valid and check move to correct route', async () => {
        
        const first_name = 'testName'
        const last_name = 'testName'
        const email = 'test@gmail.com'
        const password = 'testPass@1'
        const password_confirm = 'testPass@1'

        const mockRouter = {
            push : jest.fn()
        }

        const wrapper = shallowMount(RegisterCom,{
            global: {
                mocks: {
                    $router: mockRouter 
                }
            }
        })


        await wrapper.find("input[type=text][placeholder='First Name']").setValue(first_name)
        await wrapper.find("input[type=text][placeholder='Last Name']").setValue(last_name)
        await wrapper.find("input[type=email][placeholder='Email']").setValue(email)
        await wrapper.find('input[type=password][placeholder=Password]').setValue(password)
        await wrapper.find("input[type=password][placeholder='Confirm Password']").setValue(password_confirm)
        await wrapper.find('form').trigger('submit.prevent')

        expect(mockRouter.push).toHaveBeenCalledTimes(1)
        expect(mockRouter.push).toHaveBeenCalledWith('/login')
        expect(wrapper.vm.state.submitted).toBe("submitted");
    })
    
})