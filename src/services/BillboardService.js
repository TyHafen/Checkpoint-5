import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'

class BillboardService {
    async getAll() {
        AppState.billboards = {}
        const res = await api.get('api/ads/')
        AppState.billboards = res.data
        logger.log(AppState.billboards)
        logger.log(res.data)
    }


}


export const billboardService = new BillboardService()