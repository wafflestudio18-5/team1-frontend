import axios from 'axios';
import storage from "./lib/storage";

//baseURL 제외한 추가적인 옵션의 경우, 검색해보시면 됩니다.
const AUTH_TOKEN = 'token'
const token = storage.get(AUTH_TOKEN)
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.headers.common['Authorization'] = `Token ${token}`;
const requester = axios.create({
	baseURL: 'http://13.209.8.137/'
})

const apis = {
	token: {
		update: async (token) => {
			requester.defaults.headers.common['Authorization'] = `Token ${token}`
			return await requester.get('user/me/profile/')
		},
		delete: async () => {
			await delete requester.defaults.headers.common['Authorization']
		}
	},
	user: {
		get: async (id) => {
			return await requester.get(`user/${id}/`)
		},
		getAll: async () => {
			return await requester.get('user/')
		},
		getMyProfile: async () => {
			return await requester.get('user/me/profile/')
		},
		getIdProfile: async (id) => {
			return await requester.get(`user/${id}/profile/`)
		},
		postMyProfile: async ( {
			firstName,
			lastName,
			region,
			contact,
			schoolName,
			schoolStartYear,
			schoolEndYear,
			major,
			companyName,
			companyStartDate,
			companyEndDate
			
		}) => {
			return await requester.post('user/me/profile/', {
				firstName,
				lastName,
				region,
				contact,
				schoolName,
				schoolStartYear,
				schoolEndYear,
				major,
				companyName,
				companyStartDate,
				companyEndDate
			})
		},
		postCompany: async (company) => {
			return await requester.post('/user/me/profile/newcompany/',company)
		},
		putCompany: async (id,company) => {
			return await requester.put(`/user/me/profile/company/${id}/`,company)
		},
		postSchool: async (school) => {
			return await requester.post('/user/me/profile/newschool/',school)
		},
		putSchool: async (id,school) => {
			return await requester.put(`/user/me/profile/school/${id}/`,school)
		},
		putMyProfile: async (userinfo) => {
			return await requester.put('user/me/profile/specific/', userinfo)			
		},

		register: async ({
			email,
			password
		}) => {
			delete requester.defaults.headers.common['Authorization'];
			return await requester.post('user/', {
				email,
				password
			}).then(res=> {
				console.log('이메일 로그인 res', res)
				requester.defaults.headers.common['Authorization'] = `Token ${res.data.token}`
			})
		},
		login: async ({
			email,
			password
		}) => {
			try{
				delete requester.defaults.headers.common['Authorization']
				const result = await requester.put('user/login/', { email,password})
				requester.defaults.headers.common['Authorization'] = `Token ${result.data.token}`
				storage.set('token', result.data.token)
			}catch(error){
				alert(JSON.stringify(error.response.data))
				throw error
			}
		},
		logout: async () => {
			await requester.post('user/logout/')
			delete requester.defaults.headers.common['Authorization']
		},
		responseGoogle : async (response) => {
			try{
				
				const request = {
				tokenId: response.tokenId,
				};
				console.log(response)
				delete requester.defaults.headers.common['Authorization'];
				const result = await requester.post('social/login/', request)
				requester.defaults.headers.common['Authorization'] = `Token ${result.data.token}`
				storage.set('token',result.data.token)
				requester.get('user/').then(res=> console.log('유저 겟', res))
				}catch(error) {
					alert(JSON.stringify(error.response.data))
					throw error
				}
		},
		userName: async ({first_name,last_name}) => {
			return await requester.put('username/update/', {first_name,last_name})
		},
	},
	posts: {
		getAll: async (num) => {
			return await requester.get(`posts/?page=${num}`)
		},
		getAllLatest: async (num) => {
			return await requester.get(`posts/?order=latest&page=${num}`)
		},
		get: async (id) => {
			return await requester.get(`posts/${id}/`)
		},
		post: async (newPost) => {
			return await requester.post('posts/', newPost)
		},
		delete: async (id) => {
			return await requester.delete(`posts/${id}/`)
		}

	},
	comments: {
		post: async (post_id,comment) => {
			return await requester.post(`posts/${post_id}/comments/`,comment)
		}
	},
}

export default apis