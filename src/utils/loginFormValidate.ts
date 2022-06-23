import { defineRule } from 'vee-validate'
import { required, email, min ,max,confirmed} from '@vee-validate/rules'
import { ref, reactive} from "vue";
defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
defineRule('max', max);
defineRule('confirmed', confirmed);
const registerRules = ref({
    name(value){if (required(value)!==true) {
      return '不能为空'
    }
    return true },
    email(value){if (email(value)!==true) {
      return '格式出错'
    }else if(required(value)!==true){
      return '不能为空'
    }
    return true
    },
    password:{min:6,max:14,required},
    password2:{confirmed:'@password',required }
    })
const loginRules = ref({
    email(value){if (email(value)!==true) {
      return '格式出错'
    }else if(required(value)!==true){
      return '不能为空'
    }
    return true},
    password:required
    })  
interface RegisterUser{
        user_name: string;
        user_email: string;
        user_password: string;
        user_password2: string;
    }        
const registerUser=reactive<RegisterUser>({
      user_name:'',
      user_email:'',
      user_password:'',
      user_password2:''
  })
interface LoginUser {
    user_email: string;
    user_password: string;
    user_remember: boolean;
}
const loginUser=reactive<LoginUser>({
      user_email:'',
      user_password:'',
      user_remember:false
  })

  export {loginRules,loginUser,registerRules,registerUser}