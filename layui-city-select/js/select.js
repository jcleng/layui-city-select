//引入新的插件
layui.config({
    base: './js/'//拓展模块的根目录
}).extend({
    pca: 'pca'
});


//使用自定义的插件pca
layui.use(['form', 'layedit', 'laydate', 'upload', "jquery", "pca"], function () {
    var $ = layui.$
        , form = layui.form
        , pca = layui.pca;
    // 带初始值进行初始化
    // pca.init('select[name=P1]', 'select[name=C1]', 'select[name=A1]', '浙江', '杭州', '滨江区');
    // 带初始值进行初始化
    var defaultp  = $('select[name=P1]').data('default');
    var defaultc  = $('select[name=C1]').data('default');
    var defaulta  = $('select[name=A1]').data('default');
    pca.init('select[name=P1]', 'select[name=C1]', 'select[name=A1]', defaultp, defaultc, defaulta);
    // 不带初始值
    // pca.init('select[name=P1]', 'select[name=C1]', 'select[name=A1]');
});
