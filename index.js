
var btn_test=document.getElementById('btn_test');
// 定义nodejs环境将要引用的模块
var fs;
var path;
var edge;

//伺服电机API函数DLL
var ADLinkAdapter_ADLinkInt;
//相机模块API函数Dll
var ComAdapter_ShowChamerWin;

window.onload= ()=>{
    //alert('加载主页 index.html script我了');
    IniApp();
    loadGloableRequire();
    INI_ADLinkAdapter_ADLinkInt();
    INI_ComAdapter_ShowChamerWin();
    adlink_int_bll();
}

function IniApp(){
    try{
        window.message="你好";
        // 阀门执行状态
        window.valveServiceStatus=null;
        window.appDir=__dirname;
        alert("程序参数初始化成功");
    }
    catch(error){
        alert('程序参数初始化失败：'+error)
    }
}

// 引入Node模块
function loadGloableRequire(){
    try{
        // 注意引入顺序
        window.fs=require('fs');
        window.path=require('path');
        window.edge=require('electron-edge-js');
        fs=window.fs;
        path=window.path;
        edge=window.edge;
        alert("node模块加载完毕");
    }
    catch(error){
        alert('页面Node环境初始化失败：'+error)
    }
}


function INI_ADLinkAdapter_ADLinkInt(){
    try {
        var dllPath =path.join( window.appDir, 'dll/ADLinkAdapter.dll')
        var typeName="ADLinkAdapter.AxisBllImpl";
        var methodName="ADLinkInt";
        if (fs.existsSync(dllPath)) {
            var ADLinkAdapter_ADLinkInt = edge.func({
                assemblyFile: dllPath, //程序集dll的名称
                 typeName: typeName,     //类名，如果不指定，默认会找’Startup‘ 类
                  methodName: methodName    //方法名，方法必须是 Func<object,Task<object>> 且async ，如果不指定，默认会找'Invoke'方法})
             })
             window.ADLinkAdapter_ADLinkInt=ADLinkAdapter_ADLinkInt;
             // 1. use defalut mode
            console.log('dll path is exist');
        }
        else {
            alert('dll不存在:'+dllPath)
            console.log('dll path does not exist')
        }
    } catch (error) {
        alert("INI_ADLinkAdapter_ADLinkInt实例化失败调用出错："+error)
    }
}

function INI_ComAdapter_ShowChamerWin(){
    try {
        var dllPath =path.join(window.appDir, 'dll/ComAdapter.dll')
        var typeName="ComAdapter.ChamerBllImpl";
        var methodName="ShowChamerWin";
        if (fs.existsSync(dllPath)) {
            var ComAdapter_ShowChamerWin = edge.func({
                assemblyFile: dllPath, //程序集dll的名称
                 typeName: typeName,     //类名，如果不指定，默认会找’Startup‘ 类
                  methodName: methodName    //方法名，方法必须是 Func<object,Task<object>> 且async ，如果不指定，默认会找'Invoke'方法})
             })
            window.ComAdapter_ShowChamerWin=ComAdapter_ShowChamerWin;
             // 1. use defalut mode
            console.log('dll path is exist');
        }
        else {
            alert('dll不存在:'+dllPath)
            console.log('dll path does not exist')
        }
    } catch (error) {
        alert("INI_ComAdapter_ShowChamerWin实例化失败调用出错："+error)
    }
}

//网络监听
window.addEventListener('online',()=>{
    alert('我来了');
})
window.addEventListener('offline',()=>{
    alert('我走了');
})

//添加定义点击事件
btn_test.addEventListener("click",()=>{
    //div_test.innerHTML="点击测试";
    adlink_int_bll();
    //chamer_bll();
})

function adlink_int_bll(){
    try {
       window.adlink_config_filePath = path.join( window.appDir, 'config/ADLink/param.xml')
       if (fs.existsSync(window.adlink_config_filePath)) {
            window.ADLinkAdapter_ADLinkInt(window.adlink_config_filePath, function (error, result) {
                if (error) {
                    throw error
                } else{
                    alert(result)
                }
            })
       }
       else{
         alert('adlink_config不存在:'+window.adlink_config_filePath)
       }
    } catch (error) {
        alert("Adlink dll调用出错："+error)
    }
} 

function chamer_bll(){
    try {
       window. ComAdapter_ShowChamerWin(null, function (error, result) {
            if (error) {
                throw error
            } else{
                alert(result)
            }
        })
    } catch (error) {
        alert("相机 dll调用出错："+error)
    }
} 






