// import { Toast } from 'vant'
import { Notify } from 'vant'
export default ({ type, message }) => {
  if (type === 'danger') {
    type = fail
  }
  return Notify({ type, message })
}
