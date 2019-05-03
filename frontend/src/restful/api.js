import axios from 'axios'
import store from '../store/state'
import router from '../router'
import {Message} from 'element-ui';

// 使用代理后，不需要这两句
// export const baseUrl = "http://192.168.161.1:5000/";
// axios.defaults.baseURL = baseUrl;
axios.defaults.withCredentials = true;
// 现在传的数据都是json，所以content-type值就是application/json
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';

// pre_request钩子操作
axios.interceptors.request.use(
  function (config) {
    console.log("config", config)
    console.log("config.url", config.url)
    if (config.url.indexOf("/api/auth/") !== -1) {

    } else if (!config.url.startsWith("/api/user/")) {
      config.url = config.url.indexOf('?') == '-1' ? config.url + "?token=" + store.token : config.url + "&token=" + store.token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// after_response钩子操作
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("error flash")
    try {
      if (error.response.status === 401) {
        console.log("401 error: ")
        // 切换到Login登录界面
        router.replace({
          name: 'Login'
        })
      }
      if (error.response.status === 500) {
        console.log("500 error: ")
        // 弹出elementUI的消息弹窗
        Message.error({
          message: '服务器内部异常, 请检查',
          duration: 1000
        })
      }
    } catch (e) {
      console.log("catch error: ")
      Message.error({
        message: '服务器连接超时，请重试',
        duration: 1000
      })
    }
  });


// ------------------------------------- user api -------------------------------------------
export const register = params => {
  return axios.post('/api/auth/register/', params).then(res => res.data)
};

export const login = params => {
  return axios.post('/api/auth/login/', params).then(res => res.data)
};


// ------------------------------------- waykichain api ---------------------------------------

// project
export const addProject = body => {
  return axios.post('/api/waykichain/project/', body).then(res => res.data)
};

export const deleteProject = data => {
  return axios.delete('/api/waykichain/project/', {"data": data}).then(res => res.data)
};

export const updateProject = body => {
  return axios.patch('/api/waykichain/project/', body).then(res => res.data)
};

export const getProjectList = params => {
  return axios.get('/api/waykichain/project/', {"params": params}).then(res => res.data)
};

export const getProjectDetail = pk => {
  return axios.get('/api/waykichain/project/' + pk + '/').then(res => res.data)
};


export const getPagination = url => {
  return axios.get(url).then(res => res.data)
};

// debugtalk
export const getDebugtalk = url => {
  return axios.get('/api/waykichain/debugtalk/' + url + '/').then(res => res.data)
};

export const updateDebugtalk = params => {
  return axios.patch('/api/waykichain/debugtalk/', params).then(res => res.data)
};

export const runDebugtalk = params => {
  return axios.post('/api/waykichain/debugtalk/', params).then(res => res.data)
};


export const getTree = (url, params) => {
  return axios.get('/api/waykichain/tree/' + url + '/', params).then(res => res.data)
};

export const updateTree = (url, params) => {
  return axios.patch('/api/waykichain/tree/' + url + '/', params).then(res => res.data)
};

export const uploadFile = url => {
  return baseUrl + '/api/waykichain/file/?token=' + store.token
};


// API
export const addAPI = params => {
  return axios.post('/api/waykichain/api/', params).then(res => res.data)
};

export const updateAPI = (url, params) => {
  return axios.patch('/api/waykichain/api/' + url + '/', params).then(res => res.data)
};

export const apiList = params => {
  return axios.get('/api/waykichain/api/', params).then(res => res.data)
};

export const delAPI = url => {
  return axios.delete('/api/waykichain/api/' + url + '/').then(res => res.data)
};

export const delAllAPI = params => {
  return axios.delete('/api/waykichain/api/', params).then(res => res.data)
};

export const getAPISingle = url => {
  return axios.get('/api/waykichain/api/' + url + '/').then(res => res.data)
};


export const getPaginationBypage = params => {
  return axios.get('/api/waykichain/api/', params).then(res => res.data)
};


export const addTestCase = params => {
  return axios.post('/api/waykichain/test/', params).then(res => res.data)
};

export const updateTestCase = (url, params) => {
  return axios.patch('/api/waykichain/test/' + url + '/', params).then(res => res.data)
};

export const testList = params => {
  return axios.get('/api/waykichain/test/', params).then(res => res.data)
};

export const deleteTest = url => {
  return axios.delete('/api/waykichain/test/' + url + '/').then(res => res.data)
};

export const delAllTest = params => {
  return axios.delete('/api/waykichain/test/', params).then(res => res.data)
};

export const coptTest = (url, params) => {
  return axios.post('/api/waykichain/test/' + url + '/', params).then(res => res.data)
};

export const editTest = url => {
  return axios.get('/api/waykichain/teststep/' + url + '/').then(res => res.data)
};

export const getTestPaginationBypage = params => {
  return axios.get('/api/waykichain/test/', params).then(res => res.data)
};

export const addConfig = params => {
  return axios.post('/api/waykichain/config/', params).then(res => res.data)
};

export const updateConfig = (url, params) => {
  return axios.patch('/api/waykichain/config/' + url + '/', params).then(res => res.data)
};


export const configList = params => {
  return axios.get('/api/waykichain/config/', params).then(res => res.data)
};

export const copyConfig = (url, params) => {
  return axios.post('/api/waykichain/config/' + url + '/', params).then(res => res.data)
};

export const copyAPI = (url, params) => {
  return axios.post('/api/waykichain/api/' + url + '/', params).then(res => res.data)
};

export const deleteConfig = url => {
  return axios.delete('/api/waykichain/config/' + url + '/').then(res => res.data)
};
export const delAllConfig = params => {
  return axios.delete('/api/waykichain/config/', params).then(res => res.data)
};

export const getConfigPaginationBypage = params => {
  return axios.get('/api/waykichain/config/', params).then(res => res.data)
};

export const getAllConfig = url => {
  return axios.get('/api/waykichain/config/' + url + '/').then(res => res.data)
};


export const runSingleAPI = params => {
  return axios.post('/api/waykichain/run_api/', params).then(res => res.data)
};

export const runAPIByPk = (url, params) => {
  return axios.get('/api/waykichain/run_api_pk/' + url + '/', params).then(res => res.data)
};

export const runAPITree = params => {
  return axios.post('/api/waykichain/run_api_tree/', params).then(res => res.data)
};

export const runSingleTestSuite = params => {
  return axios.post('/api/waykichain/run_testsuite/', params).then(res => res.data)
};

export const runSingleTest = params => {
  return axios.post('/api/waykichain/run_test/', params).then(res => res.data)
};

export const runTestByPk = (url, params) => {
  return axios.get('/api/waykichain/run_testsuite_pk/' + url + '/', params).then(res => res.data)
};

export const runSuiteTree = params => {
  return axios.post('/api/waykichain/run_suite_tree/', params).then(res => res.data)
};

export const addVariables = params => {
  return axios.post('/api/waykichain/variables/', params).then(res => res.data)
};

export const variablesList = params => {
  return axios.get('/api/waykichain/variables/', params).then(res => res.data)
};

export const getVariablesPaginationBypage = params => {
  return axios.get('/api/waykichain/variables/', params).then(res => res.data)
};


export const updateVariables = (url, params) => {
  return axios.patch('/api/waykichain/variables/' + url + '/', params).then(res => res.data)
};

export const deleteVariables = url => {
  return axios.delete('/api/waykichain/variables/' + url + '/').then(res => res.data)
};

export const delAllVariabels = params => {
  return axios.delete('/api/waykichain/variables/', params).then(res => res.data)
};

export const reportList = params => {
  return axios.get('/api/waykichain/reports/', params).then(res => res.data)
};

export const deleteReports = url => {
  return axios.delete('/api/waykichain/reports/' + url + '/').then(res => res.data)
};

export const getReportsPaginationBypage = params => {
  return axios.get('/api/waykichain/reports/', params).then(res => res.data)
};

export const delAllReports = params => {
  return axios.delete('/api/waykichain/reports/', params).then(res => res.data)
};

export const watchSingleReports = url => {
  return axios.get('/api/waykichain/reports/' + url + '/').then(res => res.data)
};

export const addTask = params => {
  return axios.post('/api/waykichain/schedule/', params).then(res => res.data)
};
export const taskList = params => {
  return axios.get('/api/waykichain/schedule/', params).then(res => res.data)
};
export const getTaskPaginationBypage = params => {
  return axios.get('/api/waykichain/schedule/', params).then(res => res.data)
};
export const deleteTasks = url => {
  return axios.delete('/api/waykichain/schedule/' + url + '/').then(res => res.data)
};

export const addHostIP = params => {
  return axios.post('/api/waykichain/host_ip/', params).then(res => res.data)
};

export const hostList = params => {
  return axios.get('/api/waykichain/host_ip/', params).then(res => res.data)
};

export const updateHost = (url, params) => {
  return axios.patch('/api/waykichain/host_ip/' + url + '/', params).then(res => res.data)
};

export const deleteHost = url => {
  return axios.delete('/api/waykichain/host_ip/' + url + '/').then(res => res.data)
};

export const getHostPaginationBypage = params => {
  return axios.get('/api/waykichain/host_ip/', params).then(res => res.data)
};

export const getAllHost = url => {
  return axios.get('/api/waykichain/host_ip/' + url + '/').then(res => res.data)
};
