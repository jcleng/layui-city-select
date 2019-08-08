layui.define(['table', 'form', 'layer', 'jquery', 'element'], function (exports) {
    var $ = layui.$;
    var form = layui.form;

    var pca = {};
    pca.keys = {};
    pca.ckeys = {};

    pca.init = function (province, city, area, initprovince, initcity, initarea, form) {//jQuery选择器, 省-市-区
        var form = layui.form;
        if (!province || !$(province).length) return;
        $(province).html('');
        $(province).append('<option selected>请选择</option>');
        for (var i in citys) {
            $(province).append('<option value=' + citys[i].code + ' >' + citys[i].name + '</option>');
            pca.keys[citys[i].code] = citys[i];
        }
        form.render('select');
        if (initprovince) $(province).next().find('[lay-value="' + initprovince + '"]').click();
        if (!city || !$(city).length) return;
        pca.formRender(city);
        form.on('select(province)', function (data) {
            var cs = pca.keys[data.value];
            $(city).html('');
            $(city).append('<option>请选择</option>');
            if (cs) {
                cs = cs.sub;
                for (var i in cs) {
                    $(city).append('<option value=' + cs[i].code + '>' + cs[i].name + '</option>');
                    pca.ckeys[cs[i].code] = cs[i];
                }
                $(city).find('option:eq(1)').attr('selected', true);
            }
            form.render('select');
            $(city).next().find('.layui-this').removeClass('layui-this').click();
            pca.formHidden('province', data.value, pca.keys[data.value].name);
            $('.pca-label-province').html(data.value);//此处可以自己修改 显示的位置, 不想显示可以直接去掉
        });

        if (initprovince) $(province).next().find('[lay-value="' + initprovince + '"]').click();
        if (initcity) $(city).next().find('[lay-value="' + initcity + '"]').click();
        if (!area || !$(area).length) return;
        pca.formRender(area);
        form.on('select(city)', function (data) {
            var cs = pca.ckeys[data.value];
            $(area).html('');
            $(area).append('<option>请选择</option>');
            if (cs) {
                cs = cs.sub;
                for (var i in cs) {
                    $(area).append('<option value=' + cs[i].code + ' >' + cs[i].name + '</option>');
                    pca.ckeys[cs[i].code] = cs[i];
                }
                $(area).find('option:eq(1)').attr('selected', true);
            }
            form.render('select');
            $(area).next().find('.layui-this').removeClass('layui-this').click();
            pca.formHidden('city', data.value, pca.ckeys[data.value].name);
            $('.pca-label-city').html(data.value);	//此处可以自己修改 显示的位置, 不想显示可以直接去掉
        });
        form.on('select(area)', function (data) {
            pca.formHidden('area', data.value, pca.ckeys[data.value].name);
            $('.pca-label-area').html(data.value);	//此处可以自己修改 显示的位置, 不想显示可以直接去掉
        });
        if (initprovince) $(province).next().find('[lay-value="' + initprovince + '"]').click();
        if (initcity) $(city).next().find('[lay-value="' + initcity + '"]').click();
        if (initarea) $(area).next().find('[lay-value="' + initarea + '"]').click();
    }

    pca.formRender = function (obj) {
        $(obj).html('');
        $(obj).append('<option>请选择</option>');
        form.render('select');
    }

    pca.formHidden = function (obj, val, name) {
        console.log(name)
        if (!$('#pca-hide-' + obj).length) {
            $('form').append('<input id="pca-hide-' + obj + '" type="hidden" data-name="' + name + '" value="' + val + '" />');
        }else{
            $('#pca-hide-' + obj).val(val);
            $('#pca-hide-' + obj).attr('data-name', name);
        }
    }
    var citys = [
        {
            "name": "北京",
            "code": 2,
            "sub": [
                {
                    "name": "北京市",
                    "code": 2,
                    "sub": [
                        {
                            "name": "东城区",
                            "code": 36
                        },
                        {
                            "name": "西城区",
                            "code": 37
                        },
                        {
                            "name": "崇文区",
                            "code": 38
                        },
                        {
                            "name": "宣武区",
                            "code": 39
                        },
                        {
                            "name": "朝阳区",
                            "code": 40
                        },
                        {
                            "name": "石景山区",
                            "code": 41
                        },
                        {
                            "name": "海淀区",
                            "code": 42
                        },
                        {
                            "name": "门头沟区",
                            "code": 43
                        },
                        {
                            "name": "房山区",
                            "code": 44
                        },
                        {
                            "name": "通州区",
                            "code": 45
                        },
                        {
                            "name": "顺义区",
                            "code": 46
                        },
                        {
                            "name": "昌平区",
                            "code": 47
                        },
                        {
                            "name": "大兴区",
                            "code": 48
                        },
                        {
                            "name": "怀柔区",
                            "code": 49
                        },
                        {
                            "name": "平谷区",
                            "code": 50
                        },
                        {
                            "name": "密云县",
                            "code": 51
                        },
                        {
                            "name": "延庆县",
                            "code": 52
                        }
                    ]
                }
            ]
        },
        {
            "name": "上海",
            "code": 3,
            "sub": [
                {
                    "name": "上海市",
                    "code": 3,
                    "sub": [
                        {
                            "name": "黄浦区",
                            "code": 53
                        },
                        {
                            "name": "卢湾区",
                            "code": 54
                        },
                        {
                            "name": "徐汇区",
                            "code": 55
                        },
                        {
                            "name": "长宁区",
                            "code": 56
                        },
                        {
                            "name": "静安区",
                            "code": 57
                        },
                        {
                            "name": "普陀区",
                            "code": 58
                        },
                        {
                            "name": "闸北区",
                            "code": 59
                        },
                        {
                            "name": "虹口区",
                            "code": 60
                        },
                        {
                            "name": "杨浦区",
                            "code": 61
                        },
                        {
                            "name": "闵行区",
                            "code": 62
                        },
                        {
                            "name": "宝山区",
                            "code": 63
                        },
                        {
                            "name": "嘉定区",
                            "code": 64
                        },
                        {
                            "name": "浦东新区",
                            "code": 65
                        },
                        {
                            "name": "金山区",
                            "code": 66
                        },
                        {
                            "name": "松江区",
                            "code": 67
                        },
                        {
                            "name": "青浦区",
                            "code": 68
                        },
                        {
                            "name": "南汇区",
                            "code": 69
                        },
                        {
                            "name": "奉贤区",
                            "code": 70
                        },
                        {
                            "name": "崇明县",
                            "code": 71
                        }
                    ]
                }
            ]
        },
        {
            "name": "天津",
            "code": 4,
            "sub": [
                {
                    "name": "天津市",
                    "code": 4,
                    "sub": [
                        {
                            "name": "和平区",
                            "code": 72
                        },
                        {
                            "name": "河东区",
                            "code": 73
                        },
                        {
                            "name": "河西区",
                            "code": 74
                        },
                        {
                            "name": "南开区",
                            "code": 75
                        },
                        {
                            "name": "河北区",
                            "code": 76
                        },
                        {
                            "name": "红桥区",
                            "code": 77
                        },
                        {
                            "name": "塘沽区",
                            "code": 78
                        },
                        {
                            "name": "汉沽区",
                            "code": 79
                        },
                        {
                            "name": "大港区",
                            "code": 80
                        },
                        {
                            "name": "东丽区",
                            "code": 81
                        },
                        {
                            "name": "西青区",
                            "code": 82
                        },
                        {
                            "name": "津南区",
                            "code": 83
                        },
                        {
                            "name": "北辰区",
                            "code": 84
                        },
                        {
                            "name": "武清区",
                            "code": 85
                        },
                        {
                            "name": "宝坻区",
                            "code": 86
                        },
                        {
                            "name": "宁河县",
                            "code": 87
                        },
                        {
                            "name": "静海县",
                            "code": 88
                        },
                        {
                            "name": "蓟县",
                            "code": 89
                        }
                    ]
                }
            ]
        },
        {
            "name": "重庆",
            "code": 5,
            "sub": [
                {
                    "name": "重庆市",
                    "code": 5,
                    "sub": [
                        {
                            "name": "万州区",
                            "code": 90
                        },
                        {
                            "name": "涪陵区",
                            "code": 91
                        },
                        {
                            "name": "渝中区",
                            "code": 92
                        },
                        {
                            "name": "大渡口区",
                            "code": 93
                        },
                        {
                            "name": "江北区",
                            "code": 94
                        },
                        {
                            "name": "沙坪坝区",
                            "code": 95
                        },
                        {
                            "name": "九龙坡区",
                            "code": 96
                        },
                        {
                            "name": "南岸区",
                            "code": 97
                        },
                        {
                            "name": "北碚区",
                            "code": 98
                        },
                        {
                            "name": "万盛区",
                            "code": 99
                        },
                        {
                            "name": "双桥区",
                            "code": 100
                        },
                        {
                            "name": "渝北区",
                            "code": 101
                        },
                        {
                            "name": "巴南区",
                            "code": 102
                        },
                        {
                            "name": "黔江区",
                            "code": 103
                        },
                        {
                            "name": "长寿区",
                            "code": 104
                        },
                        {
                            "name": "綦江县",
                            "code": 105
                        },
                        {
                            "name": "潼南县",
                            "code": 106
                        },
                        {
                            "name": "铜梁县",
                            "code": 107
                        },
                        {
                            "name": "大足县",
                            "code": 108
                        },
                        {
                            "name": "荣昌县",
                            "code": 109
                        },
                        {
                            "name": "璧山县",
                            "code": 110
                        },
                        {
                            "name": "梁平县",
                            "code": 111
                        },
                        {
                            "name": "城口县",
                            "code": 112
                        },
                        {
                            "name": "丰都县",
                            "code": 113
                        },
                        {
                            "name": "垫江县",
                            "code": 114
                        },
                        {
                            "name": "武隆县",
                            "code": 115
                        },
                        {
                            "name": "忠县",
                            "code": 116
                        },
                        {
                            "name": "开县",
                            "code": 117
                        },
                        {
                            "name": "云阳县",
                            "code": 118
                        },
                        {
                            "name": "奉节县",
                            "code": 119
                        },
                        {
                            "name": "巫山县",
                            "code": 120
                        },
                        {
                            "name": "巫溪县",
                            "code": 121
                        },
                        {
                            "name": "石柱县",
                            "code": 122
                        },
                        {
                            "name": "秀山县",
                            "code": 123
                        },
                        {
                            "name": "酉阳县",
                            "code": 124
                        },
                        {
                            "name": "彭水县",
                            "code": 125
                        },
                        {
                            "name": "江津区",
                            "code": 126
                        },
                        {
                            "name": "合川区",
                            "code": 127
                        },
                        {
                            "name": "永川区",
                            "code": 128
                        },
                        {
                            "name": "南川区",
                            "code": 129
                        }
                    ]
                }
            ]
        },
        {
            "name": "河北省",
            "code": 6,
            "sub": [
                {
                    "name": "石家庄市",
                    "code": 130,
                    "sub": [
                        {
                            "name": "长安区",
                            "code": 540
                        },
                        {
                            "name": "桥东区",
                            "code": 541
                        },
                        {
                            "name": "桥西区",
                            "code": 542
                        },
                        {
                            "name": "新华区",
                            "code": 543
                        },
                        {
                            "name": "井陉矿区",
                            "code": 544
                        },
                        {
                            "name": "裕华区",
                            "code": 545
                        },
                        {
                            "name": "井陉县",
                            "code": 546
                        },
                        {
                            "name": "正定县",
                            "code": 547
                        },
                        {
                            "name": "栾城县",
                            "code": 548
                        },
                        {
                            "name": "行唐县",
                            "code": 549
                        },
                        {
                            "name": "灵寿县",
                            "code": 550
                        },
                        {
                            "name": "高邑县",
                            "code": 551
                        },
                        {
                            "name": "深泽县",
                            "code": 552
                        },
                        {
                            "name": "赞皇县",
                            "code": 553
                        },
                        {
                            "name": "无极县",
                            "code": 554
                        },
                        {
                            "name": "平山县",
                            "code": 555
                        },
                        {
                            "name": "元氏县",
                            "code": 556
                        },
                        {
                            "name": "赵县",
                            "code": 557
                        },
                        {
                            "name": "辛集市",
                            "code": 558
                        },
                        {
                            "name": "藁城市",
                            "code": 559
                        },
                        {
                            "name": "晋州市",
                            "code": 560
                        },
                        {
                            "name": "新乐市",
                            "code": 561
                        },
                        {
                            "name": "鹿泉市",
                            "code": 562
                        }
                    ]
                },
                {
                    "name": "唐山市",
                    "code": 131,
                    "sub": [
                        {
                            "name": "路南区",
                            "code": 563
                        },
                        {
                            "name": "路北区",
                            "code": 564
                        },
                        {
                            "name": "古冶区",
                            "code": 565
                        },
                        {
                            "name": "开平区",
                            "code": 566
                        },
                        {
                            "name": "丰南区",
                            "code": 567
                        },
                        {
                            "name": "丰润区",
                            "code": 568
                        },
                        {
                            "name": "滦县",
                            "code": 569
                        },
                        {
                            "name": "滦南县",
                            "code": 570
                        },
                        {
                            "name": "乐亭县",
                            "code": 571
                        },
                        {
                            "name": "迁西县",
                            "code": 572
                        },
                        {
                            "name": "玉田县",
                            "code": 573
                        },
                        {
                            "name": "唐海县",
                            "code": 574
                        },
                        {
                            "name": "遵化市",
                            "code": 575
                        },
                        {
                            "name": "迁安市",
                            "code": 576
                        }
                    ]
                },
                {
                    "name": "秦皇岛市",
                    "code": 132,
                    "sub": [
                        {
                            "name": "海港区",
                            "code": 577
                        },
                        {
                            "name": "山海关区",
                            "code": 578
                        },
                        {
                            "name": "北戴河区",
                            "code": 579
                        },
                        {
                            "name": "青龙县",
                            "code": 580
                        },
                        {
                            "name": "昌黎县",
                            "code": 581
                        },
                        {
                            "name": "抚宁县",
                            "code": 582
                        },
                        {
                            "name": "卢龙县",
                            "code": 583
                        }
                    ]
                },
                {
                    "name": "邯郸市",
                    "code": 133,
                    "sub": [
                        {
                            "name": "邯山区",
                            "code": 584
                        },
                        {
                            "name": "丛台区",
                            "code": 585
                        },
                        {
                            "name": "复兴区",
                            "code": 586
                        },
                        {
                            "name": "峰峰矿区",
                            "code": 587
                        },
                        {
                            "name": "邯郸县",
                            "code": 588
                        },
                        {
                            "name": "临漳县",
                            "code": 589
                        },
                        {
                            "name": "成安县",
                            "code": 590
                        },
                        {
                            "name": "大名县",
                            "code": 591
                        },
                        {
                            "name": "涉县",
                            "code": 592
                        },
                        {
                            "name": "磁县",
                            "code": 593
                        },
                        {
                            "name": "肥乡县",
                            "code": 594
                        },
                        {
                            "name": "永年县",
                            "code": 595
                        },
                        {
                            "name": "邱县",
                            "code": 596
                        },
                        {
                            "name": "鸡泽县",
                            "code": 597
                        },
                        {
                            "name": "广平县",
                            "code": 598
                        },
                        {
                            "name": "馆陶县",
                            "code": 599
                        },
                        {
                            "name": "魏县",
                            "code": 600
                        },
                        {
                            "name": "曲周县",
                            "code": 601
                        },
                        {
                            "name": "武安市",
                            "code": 602
                        }
                    ]
                },
                {
                    "name": "邢台市",
                    "code": 134,
                    "sub": [
                        {
                            "name": "桥东区",
                            "code": 603
                        },
                        {
                            "name": "桥西区",
                            "code": 604
                        },
                        {
                            "name": "邢台县",
                            "code": 605
                        },
                        {
                            "name": "临城县",
                            "code": 606
                        },
                        {
                            "name": "内丘县",
                            "code": 607
                        },
                        {
                            "name": "柏乡县",
                            "code": 608
                        },
                        {
                            "name": "隆尧县",
                            "code": 609
                        },
                        {
                            "name": "任县",
                            "code": 610
                        },
                        {
                            "name": "南和县",
                            "code": 611
                        },
                        {
                            "name": "宁晋县",
                            "code": 612
                        },
                        {
                            "name": "巨鹿县",
                            "code": 613
                        },
                        {
                            "name": "新河县",
                            "code": 614
                        },
                        {
                            "name": "广宗县",
                            "code": 615
                        },
                        {
                            "name": "平乡县",
                            "code": 616
                        },
                        {
                            "name": "威县",
                            "code": 617
                        },
                        {
                            "name": "清河县",
                            "code": 618
                        },
                        {
                            "name": "临西县",
                            "code": 619
                        },
                        {
                            "name": "南宫市",
                            "code": 620
                        },
                        {
                            "name": "沙河市",
                            "code": 621
                        }
                    ]
                },
                {
                    "name": "保定市",
                    "code": 135,
                    "sub": [
                        {
                            "name": "新市区",
                            "code": 622
                        },
                        {
                            "name": "北市区",
                            "code": 623
                        },
                        {
                            "name": "南市区",
                            "code": 624
                        },
                        {
                            "name": "满城县",
                            "code": 625
                        },
                        {
                            "name": "清苑县",
                            "code": 626
                        },
                        {
                            "name": "涞水县",
                            "code": 627
                        },
                        {
                            "name": "阜平县",
                            "code": 628
                        },
                        {
                            "name": "徐水县",
                            "code": 629
                        },
                        {
                            "name": "定兴县",
                            "code": 630
                        },
                        {
                            "name": "唐县",
                            "code": 631
                        },
                        {
                            "name": "高阳县",
                            "code": 632
                        },
                        {
                            "name": "容城县",
                            "code": 633
                        },
                        {
                            "name": "涞源县",
                            "code": 634
                        },
                        {
                            "name": "望都县",
                            "code": 635
                        },
                        {
                            "name": "安新县",
                            "code": 636
                        },
                        {
                            "name": "易县",
                            "code": 637
                        },
                        {
                            "name": "曲阳县",
                            "code": 638
                        },
                        {
                            "name": "蠡县",
                            "code": 639
                        },
                        {
                            "name": "顺平县",
                            "code": 640
                        },
                        {
                            "name": "博野县",
                            "code": 641
                        },
                        {
                            "name": "雄县",
                            "code": 642
                        },
                        {
                            "name": "涿州市",
                            "code": 643
                        },
                        {
                            "name": "定州市",
                            "code": 644
                        },
                        {
                            "name": "安国市",
                            "code": 645
                        },
                        {
                            "name": "高碑店市",
                            "code": 646
                        }
                    ]
                },
                {
                    "name": "张家口市",
                    "code": 136,
                    "sub": [
                        {
                            "name": "桥东区",
                            "code": 647
                        },
                        {
                            "name": "桥西区",
                            "code": 648
                        },
                        {
                            "name": "宣化区",
                            "code": 649
                        },
                        {
                            "name": "下花园区",
                            "code": 650
                        },
                        {
                            "name": "宣化县",
                            "code": 651
                        },
                        {
                            "name": "张北县",
                            "code": 652
                        },
                        {
                            "name": "康保县",
                            "code": 653
                        },
                        {
                            "name": "沽源县",
                            "code": 654
                        },
                        {
                            "name": "尚义县",
                            "code": 655
                        },
                        {
                            "name": "蔚县",
                            "code": 656
                        },
                        {
                            "name": "阳原县",
                            "code": 657
                        },
                        {
                            "name": "怀安县",
                            "code": 658
                        },
                        {
                            "name": "万全县",
                            "code": 659
                        },
                        {
                            "name": "怀来县",
                            "code": 660
                        },
                        {
                            "name": "涿鹿县",
                            "code": 661
                        },
                        {
                            "name": "赤城县",
                            "code": 662
                        },
                        {
                            "name": "崇礼县",
                            "code": 663
                        }
                    ]
                },
                {
                    "name": "承德市",
                    "code": 137,
                    "sub": [
                        {
                            "name": "双桥区",
                            "code": 664
                        },
                        {
                            "name": "双滦区",
                            "code": 665
                        },
                        {
                            "name": "鹰手营子矿区",
                            "code": 666
                        },
                        {
                            "name": "承德县",
                            "code": 667
                        },
                        {
                            "name": "兴隆县",
                            "code": 668
                        },
                        {
                            "name": "平泉县",
                            "code": 669
                        },
                        {
                            "name": "滦平县",
                            "code": 670
                        },
                        {
                            "name": "隆化县",
                            "code": 671
                        },
                        {
                            "name": "丰宁县",
                            "code": 672
                        },
                        {
                            "name": "宽城县",
                            "code": 673
                        },
                        {
                            "name": "围场县",
                            "code": 674
                        }
                    ]
                },
                {
                    "name": "沧州市",
                    "code": 138,
                    "sub": [
                        {
                            "name": "新华区",
                            "code": 675
                        },
                        {
                            "name": "运河区",
                            "code": 676
                        },
                        {
                            "name": "沧县",
                            "code": 677
                        },
                        {
                            "name": "青县",
                            "code": 678
                        },
                        {
                            "name": "东光县",
                            "code": 679
                        },
                        {
                            "name": "海兴县",
                            "code": 680
                        },
                        {
                            "name": "盐山县",
                            "code": 681
                        },
                        {
                            "name": "肃宁县",
                            "code": 682
                        },
                        {
                            "name": "南皮县",
                            "code": 683
                        },
                        {
                            "name": "吴桥县",
                            "code": 684
                        },
                        {
                            "name": "献县",
                            "code": 685
                        },
                        {
                            "name": "孟村县",
                            "code": 686
                        },
                        {
                            "name": "泊头市",
                            "code": 687
                        },
                        {
                            "name": "任丘市",
                            "code": 688
                        },
                        {
                            "name": "黄骅市",
                            "code": 689
                        },
                        {
                            "name": "河间市",
                            "code": 690
                        }
                    ]
                },
                {
                    "name": "廊坊市",
                    "code": 139,
                    "sub": [
                        {
                            "name": "安次区",
                            "code": 691
                        },
                        {
                            "name": "广阳区",
                            "code": 692
                        },
                        {
                            "name": "固安县",
                            "code": 693
                        },
                        {
                            "name": "永清县",
                            "code": 694
                        },
                        {
                            "name": "香河县",
                            "code": 695
                        },
                        {
                            "name": "大城县",
                            "code": 696
                        },
                        {
                            "name": "文安县",
                            "code": 697
                        },
                        {
                            "name": "大厂县",
                            "code": 698
                        },
                        {
                            "name": "霸州市",
                            "code": 699
                        },
                        {
                            "name": "三河市",
                            "code": 700
                        }
                    ]
                },
                {
                    "name": "衡水市",
                    "code": 140,
                    "sub": [
                        {
                            "name": "桃城区",
                            "code": 701
                        },
                        {
                            "name": "枣强县",
                            "code": 702
                        },
                        {
                            "name": "武邑县",
                            "code": 703
                        },
                        {
                            "name": "武强县",
                            "code": 704
                        },
                        {
                            "name": "饶阳县",
                            "code": 705
                        },
                        {
                            "name": "安平县",
                            "code": 706
                        },
                        {
                            "name": "故城县",
                            "code": 707
                        },
                        {
                            "name": "景县",
                            "code": 708
                        },
                        {
                            "name": "阜城县",
                            "code": 709
                        },
                        {
                            "name": "冀州市",
                            "code": 710
                        },
                        {
                            "name": "深州市",
                            "code": 711
                        }
                    ]
                }
            ]
        },
        {
            "name": "山西省",
            "code": 7,
            "sub": [
                {
                    "name": "太原市",
                    "code": 141,
                    "sub": [
                        {
                            "name": "小店区",
                            "code": 712
                        },
                        {
                            "name": "迎泽区",
                            "code": 713
                        },
                        {
                            "name": "杏花岭区",
                            "code": 714
                        },
                        {
                            "name": "尖草坪区",
                            "code": 715
                        },
                        {
                            "name": "万柏林区",
                            "code": 716
                        },
                        {
                            "name": "晋源区",
                            "code": 717
                        },
                        {
                            "name": "清徐县",
                            "code": 718
                        },
                        {
                            "name": "阳曲县",
                            "code": 719
                        },
                        {
                            "name": "娄烦县",
                            "code": 720
                        },
                        {
                            "name": "古交市",
                            "code": 721
                        }
                    ]
                },
                {
                    "name": "大同市",
                    "code": 142,
                    "sub": [
                        {
                            "name": "城区",
                            "code": 722
                        },
                        {
                            "name": "矿区",
                            "code": 723
                        },
                        {
                            "name": "南郊区",
                            "code": 724
                        },
                        {
                            "name": "新荣区",
                            "code": 725
                        },
                        {
                            "name": "阳高县",
                            "code": 726
                        },
                        {
                            "name": "天镇县",
                            "code": 727
                        },
                        {
                            "name": "广灵县",
                            "code": 728
                        },
                        {
                            "name": "灵丘县",
                            "code": 729
                        },
                        {
                            "name": "浑源县",
                            "code": 730
                        },
                        {
                            "name": "左云县",
                            "code": 731
                        },
                        {
                            "name": "大同县",
                            "code": 732
                        }
                    ]
                },
                {
                    "name": "阳泉市",
                    "code": 143,
                    "sub": [
                        {
                            "name": "城区",
                            "code": 733
                        },
                        {
                            "name": "矿区",
                            "code": 734
                        },
                        {
                            "name": "郊区",
                            "code": 735
                        },
                        {
                            "name": "平定县",
                            "code": 736
                        },
                        {
                            "name": "盂县",
                            "code": 737
                        }
                    ]
                },
                {
                    "name": "长治市",
                    "code": 144,
                    "sub": [
                        {
                            "name": "城区",
                            "code": 738
                        },
                        {
                            "name": "郊区",
                            "code": 739
                        },
                        {
                            "name": "长治县",
                            "code": 740
                        },
                        {
                            "name": "襄垣县",
                            "code": 741
                        },
                        {
                            "name": "屯留县",
                            "code": 742
                        },
                        {
                            "name": "平顺县",
                            "code": 743
                        },
                        {
                            "name": "黎城县",
                            "code": 744
                        },
                        {
                            "name": "壶关县",
                            "code": 745
                        },
                        {
                            "name": "长子县",
                            "code": 746
                        },
                        {
                            "name": "武乡县",
                            "code": 747
                        },
                        {
                            "name": "沁县",
                            "code": 748
                        },
                        {
                            "name": "沁源县",
                            "code": 749
                        },
                        {
                            "name": "潞城市",
                            "code": 750
                        }
                    ]
                },
                {
                    "name": "晋城市",
                    "code": 145,
                    "sub": [
                        {
                            "name": "城区",
                            "code": 751
                        },
                        {
                            "name": "沁水县",
                            "code": 752
                        },
                        {
                            "name": "阳城县",
                            "code": 753
                        },
                        {
                            "name": "陵川县",
                            "code": 754
                        },
                        {
                            "name": "泽州县",
                            "code": 755
                        },
                        {
                            "name": "高平市",
                            "code": 756
                        }
                    ]
                },
                {
                    "name": "朔州市",
                    "code": 146,
                    "sub": [
                        {
                            "name": "朔城区",
                            "code": 757
                        },
                        {
                            "name": "平鲁区",
                            "code": 758
                        },
                        {
                            "name": "山阴县",
                            "code": 759
                        },
                        {
                            "name": "应县",
                            "code": 760
                        },
                        {
                            "name": "右玉县",
                            "code": 761
                        },
                        {
                            "name": "怀仁县",
                            "code": 762
                        }
                    ]
                },
                {
                    "name": "晋中市",
                    "code": 147,
                    "sub": [
                        {
                            "name": "榆次区",
                            "code": 763
                        },
                        {
                            "name": "榆社县",
                            "code": 764
                        },
                        {
                            "name": "左权县",
                            "code": 765
                        },
                        {
                            "name": "和顺县",
                            "code": 766
                        },
                        {
                            "name": "昔阳县",
                            "code": 767
                        },
                        {
                            "name": "寿阳县",
                            "code": 768
                        },
                        {
                            "name": "太谷县",
                            "code": 769
                        },
                        {
                            "name": "祁县",
                            "code": 770
                        },
                        {
                            "name": "平遥县",
                            "code": 771
                        },
                        {
                            "name": "灵石县",
                            "code": 772
                        },
                        {
                            "name": "介休市",
                            "code": 773
                        }
                    ]
                },
                {
                    "name": "运城市",
                    "code": 148,
                    "sub": [
                        {
                            "name": "盐湖区",
                            "code": 774
                        },
                        {
                            "name": "临猗县",
                            "code": 775
                        },
                        {
                            "name": "万荣县",
                            "code": 776
                        },
                        {
                            "name": "闻喜县",
                            "code": 777
                        },
                        {
                            "name": "稷山县",
                            "code": 778
                        },
                        {
                            "name": "新绛县",
                            "code": 779
                        },
                        {
                            "name": "绛县",
                            "code": 780
                        },
                        {
                            "name": "垣曲县",
                            "code": 781
                        },
                        {
                            "name": "夏县",
                            "code": 782
                        },
                        {
                            "name": "平陆县",
                            "code": 783
                        },
                        {
                            "name": "芮城县",
                            "code": 784
                        },
                        {
                            "name": "永济市",
                            "code": 785
                        },
                        {
                            "name": "河津市",
                            "code": 786
                        }
                    ]
                },
                {
                    "name": "忻州市",
                    "code": 149,
                    "sub": [
                        {
                            "name": "忻府区",
                            "code": 787
                        },
                        {
                            "name": "定襄县",
                            "code": 788
                        },
                        {
                            "name": "五台县",
                            "code": 789
                        },
                        {
                            "name": "代县",
                            "code": 790
                        },
                        {
                            "name": "繁峙县",
                            "code": 791
                        },
                        {
                            "name": "宁武县",
                            "code": 792
                        },
                        {
                            "name": "静乐县",
                            "code": 793
                        },
                        {
                            "name": "神池县",
                            "code": 794
                        },
                        {
                            "name": "五寨县",
                            "code": 795
                        },
                        {
                            "name": "岢岚县",
                            "code": 796
                        },
                        {
                            "name": "河曲县",
                            "code": 797
                        },
                        {
                            "name": "保德县",
                            "code": 798
                        },
                        {
                            "name": "偏关县",
                            "code": 799
                        },
                        {
                            "name": "原平市",
                            "code": 800
                        }
                    ]
                },
                {
                    "name": "临汾市",
                    "code": 150,
                    "sub": [
                        {
                            "name": "尧都区",
                            "code": 801
                        },
                        {
                            "name": "曲沃县",
                            "code": 802
                        },
                        {
                            "name": "翼城县",
                            "code": 803
                        },
                        {
                            "name": "襄汾县",
                            "code": 804
                        },
                        {
                            "name": "洪洞县",
                            "code": 805
                        },
                        {
                            "name": "古县",
                            "code": 806
                        },
                        {
                            "name": "安泽县",
                            "code": 807
                        },
                        {
                            "name": "浮山县",
                            "code": 808
                        },
                        {
                            "name": "吉县",
                            "code": 809
                        },
                        {
                            "name": "乡宁县",
                            "code": 810
                        },
                        {
                            "name": "大宁县",
                            "code": 811
                        },
                        {
                            "name": "隰县",
                            "code": 812
                        },
                        {
                            "name": "永和县",
                            "code": 813
                        },
                        {
                            "name": "蒲县",
                            "code": 814
                        },
                        {
                            "name": "汾西县",
                            "code": 815
                        },
                        {
                            "name": "侯马市",
                            "code": 816
                        },
                        {
                            "name": "霍州市",
                            "code": 817
                        }
                    ]
                },
                {
                    "name": "吕梁市",
                    "code": 151,
                    "sub": [
                        {
                            "name": "离石区",
                            "code": 818
                        },
                        {
                            "name": "文水县",
                            "code": 819
                        },
                        {
                            "name": "交城县",
                            "code": 820
                        },
                        {
                            "name": "兴县",
                            "code": 821
                        },
                        {
                            "name": "临县",
                            "code": 822
                        },
                        {
                            "name": "柳林县",
                            "code": 823
                        },
                        {
                            "name": "石楼县",
                            "code": 824
                        },
                        {
                            "name": "岚县",
                            "code": 825
                        },
                        {
                            "name": "方山县",
                            "code": 826
                        },
                        {
                            "name": "中阳县",
                            "code": 827
                        },
                        {
                            "name": "交口县",
                            "code": 828
                        },
                        {
                            "name": "孝义市",
                            "code": 829
                        },
                        {
                            "name": "汾阳市",
                            "code": 830
                        }
                    ]
                }
            ]
        },
        {
            "name": "内蒙古",
            "code": 8,
            "sub": [
                {
                    "name": "呼和浩特市",
                    "code": 152,
                    "sub": [
                        {
                            "name": "新城区",
                            "code": 831
                        },
                        {
                            "name": "回民区",
                            "code": 832
                        },
                        {
                            "name": "玉泉区",
                            "code": 833
                        },
                        {
                            "name": "赛罕区",
                            "code": 834
                        },
                        {
                            "name": "土默特左旗",
                            "code": 835
                        },
                        {
                            "name": "托克托县",
                            "code": 836
                        },
                        {
                            "name": "和林格尔县",
                            "code": 837
                        },
                        {
                            "name": "清水河县",
                            "code": 838
                        },
                        {
                            "name": "武川县",
                            "code": 839
                        }
                    ]
                },
                {
                    "name": "包头市",
                    "code": 153,
                    "sub": [
                        {
                            "name": "东河区",
                            "code": 840
                        },
                        {
                            "name": "昆都仑区",
                            "code": 841
                        },
                        {
                            "name": "青山区",
                            "code": 842
                        },
                        {
                            "name": "石拐区",
                            "code": 843
                        },
                        {
                            "name": "白云矿区",
                            "code": 844
                        },
                        {
                            "name": "九原区",
                            "code": 845
                        },
                        {
                            "name": "土默特右旗",
                            "code": 846
                        },
                        {
                            "name": "固阳县",
                            "code": 847
                        },
                        {
                            "name": "达尔罕茂明安联合旗",
                            "code": 848
                        }
                    ]
                },
                {
                    "name": "乌海市",
                    "code": 154,
                    "sub": [
                        {
                            "name": "海勃湾区",
                            "code": 849
                        },
                        {
                            "name": "海南区",
                            "code": 850
                        },
                        {
                            "name": "乌达区",
                            "code": 851
                        }
                    ]
                },
                {
                    "name": "赤峰市",
                    "code": 155,
                    "sub": [
                        {
                            "name": "红山区",
                            "code": 852
                        },
                        {
                            "name": "元宝山区",
                            "code": 853
                        },
                        {
                            "name": "松山区",
                            "code": 854
                        },
                        {
                            "name": "阿鲁科尔沁旗",
                            "code": 855
                        },
                        {
                            "name": "巴林左旗",
                            "code": 856
                        },
                        {
                            "name": "巴林右旗",
                            "code": 857
                        },
                        {
                            "name": "林西县",
                            "code": 858
                        },
                        {
                            "name": "克什克腾旗",
                            "code": 859
                        },
                        {
                            "name": "翁牛特旗",
                            "code": 860
                        },
                        {
                            "name": "喀喇沁旗",
                            "code": 861
                        },
                        {
                            "name": "宁城县",
                            "code": 862
                        },
                        {
                            "name": "敖汉旗",
                            "code": 863
                        }
                    ]
                },
                {
                    "name": "通辽市",
                    "code": 156,
                    "sub": [
                        {
                            "name": "科尔沁区",
                            "code": 864
                        },
                        {
                            "name": "科尔沁左翼中旗",
                            "code": 865
                        },
                        {
                            "name": "科尔沁左翼后旗",
                            "code": 866
                        },
                        {
                            "name": "开鲁县",
                            "code": 867
                        },
                        {
                            "name": "库伦旗",
                            "code": 868
                        },
                        {
                            "name": "奈曼旗",
                            "code": 869
                        },
                        {
                            "name": "扎鲁特旗",
                            "code": 870
                        },
                        {
                            "name": "霍林郭勒市",
                            "code": 871
                        }
                    ]
                },
                {
                    "name": "鄂尔多斯市",
                    "code": 157,
                    "sub": [
                        {
                            "name": "东胜区",
                            "code": 872
                        },
                        {
                            "name": "达拉特旗",
                            "code": 873
                        },
                        {
                            "name": "准格尔旗",
                            "code": 874
                        },
                        {
                            "name": "鄂托克前旗",
                            "code": 875
                        },
                        {
                            "name": "鄂托克旗",
                            "code": 876
                        },
                        {
                            "name": "杭锦旗",
                            "code": 877
                        },
                        {
                            "name": "乌审旗",
                            "code": 878
                        },
                        {
                            "name": "伊金霍洛旗",
                            "code": 879
                        }
                    ]
                },
                {
                    "name": "呼伦贝尔市",
                    "code": 158,
                    "sub": [
                        {
                            "name": "海拉尔区",
                            "code": 880
                        },
                        {
                            "name": "阿荣旗",
                            "code": 881
                        },
                        {
                            "name": "莫力达瓦达斡尔族自治旗",
                            "code": 882
                        },
                        {
                            "name": "鄂伦春自治旗",
                            "code": 883
                        },
                        {
                            "name": "鄂温克族自治旗",
                            "code": 884
                        },
                        {
                            "name": "陈巴尔虎旗",
                            "code": 885
                        },
                        {
                            "name": "新巴尔虎左旗",
                            "code": 886
                        },
                        {
                            "name": "新巴尔虎右旗",
                            "code": 887
                        },
                        {
                            "name": "满洲里市",
                            "code": 888
                        },
                        {
                            "name": "牙克石市",
                            "code": 889
                        },
                        {
                            "name": "扎兰屯市",
                            "code": 890
                        },
                        {
                            "name": "额尔古纳市",
                            "code": 891
                        },
                        {
                            "name": "根河市",
                            "code": 892
                        }
                    ]
                },
                {
                    "name": "巴彦淖尔市",
                    "code": 159,
                    "sub": [
                        {
                            "name": "临河区",
                            "code": 893
                        },
                        {
                            "name": "五原县",
                            "code": 894
                        },
                        {
                            "name": "磴口县",
                            "code": 895
                        },
                        {
                            "name": "乌拉特前旗",
                            "code": 896
                        },
                        {
                            "name": "乌拉特中旗",
                            "code": 897
                        },
                        {
                            "name": "乌拉特后旗",
                            "code": 898
                        },
                        {
                            "name": "杭锦后旗",
                            "code": 899
                        }
                    ]
                },
                {
                    "name": "乌兰察布市",
                    "code": 160,
                    "sub": [
                        {
                            "name": "集宁区",
                            "code": 900
                        },
                        {
                            "name": "卓资县",
                            "code": 901
                        },
                        {
                            "name": "化德县",
                            "code": 902
                        },
                        {
                            "name": "商都县",
                            "code": 903
                        },
                        {
                            "name": "兴和县",
                            "code": 904
                        },
                        {
                            "name": "凉城县",
                            "code": 905
                        },
                        {
                            "name": "察哈尔右翼前旗",
                            "code": 906
                        },
                        {
                            "name": "察哈尔右翼中旗",
                            "code": 907
                        },
                        {
                            "name": "察哈尔右翼后旗",
                            "code": 908
                        },
                        {
                            "name": "四子王旗",
                            "code": 909
                        },
                        {
                            "name": "丰镇市",
                            "code": 910
                        }
                    ]
                },
                {
                    "name": "兴安盟",
                    "code": 161,
                    "sub": [
                        {
                            "name": "乌兰浩特市",
                            "code": 911
                        },
                        {
                            "name": "阿尔山市",
                            "code": 912
                        },
                        {
                            "name": "科尔沁右翼前旗",
                            "code": 913
                        },
                        {
                            "name": "科尔沁右翼中旗",
                            "code": 914
                        },
                        {
                            "name": "扎赉特旗",
                            "code": 915
                        },
                        {
                            "name": "突泉县",
                            "code": 916
                        }
                    ]
                },
                {
                    "name": "锡林郭勒盟",
                    "code": 162,
                    "sub": [
                        {
                            "name": "二连浩特市",
                            "code": 917
                        },
                        {
                            "name": "锡林浩特市",
                            "code": 918
                        },
                        {
                            "name": "阿巴嘎旗",
                            "code": 919
                        },
                        {
                            "name": "苏尼特左旗",
                            "code": 920
                        },
                        {
                            "name": "苏尼特右旗",
                            "code": 921
                        },
                        {
                            "name": "东乌珠穆沁旗",
                            "code": 922
                        },
                        {
                            "name": "西乌珠穆沁旗",
                            "code": 923
                        },
                        {
                            "name": "太仆寺旗",
                            "code": 924
                        },
                        {
                            "name": "镶黄旗",
                            "code": 925
                        },
                        {
                            "name": "正镶白旗",
                            "code": 926
                        },
                        {
                            "name": "正蓝旗",
                            "code": 927
                        },
                        {
                            "name": "多伦县",
                            "code": 928
                        }
                    ]
                },
                {
                    "name": "阿拉善盟",
                    "code": 163,
                    "sub": [
                        {
                            "name": "阿拉善左旗",
                            "code": 929
                        },
                        {
                            "name": "阿拉善右旗",
                            "code": 930
                        },
                        {
                            "name": "额济纳旗",
                            "code": 931
                        }
                    ]
                }
            ]
        },
        {
            "name": "辽宁省",
            "code": 9,
            "sub": [
                {
                    "name": "沈阳市",
                    "code": 164,
                    "sub": [
                        {
                            "name": "和平区",
                            "code": 932
                        },
                        {
                            "name": "沈河区",
                            "code": 933
                        },
                        {
                            "name": "大东区",
                            "code": 934
                        },
                        {
                            "name": "皇姑区",
                            "code": 935
                        },
                        {
                            "name": "铁西区",
                            "code": 936
                        },
                        {
                            "name": "苏家屯区",
                            "code": 937
                        },
                        {
                            "name": "东陵区",
                            "code": 938
                        },
                        {
                            "name": "新城子区",
                            "code": 939
                        },
                        {
                            "name": "于洪区",
                            "code": 940
                        },
                        {
                            "name": "辽中县",
                            "code": 941
                        },
                        {
                            "name": "康平县",
                            "code": 942
                        },
                        {
                            "name": "法库县",
                            "code": 943
                        },
                        {
                            "name": "新民市",
                            "code": 944
                        }
                    ]
                },
                {
                    "name": "大连市",
                    "code": 165,
                    "sub": [
                        {
                            "name": "中山区",
                            "code": 945
                        },
                        {
                            "name": "西岗区",
                            "code": 946
                        },
                        {
                            "name": "沙河口区",
                            "code": 947
                        },
                        {
                            "name": "甘井子区",
                            "code": 948
                        },
                        {
                            "name": "旅顺口区",
                            "code": 949
                        },
                        {
                            "name": "金州区",
                            "code": 950
                        },
                        {
                            "name": "长海县",
                            "code": 951
                        },
                        {
                            "name": "瓦房店市",
                            "code": 952
                        },
                        {
                            "name": "普兰店市",
                            "code": 953
                        },
                        {
                            "name": "庄河市",
                            "code": 954
                        }
                    ]
                },
                {
                    "name": "鞍山市",
                    "code": 166,
                    "sub": [
                        {
                            "name": "铁东区",
                            "code": 955
                        },
                        {
                            "name": "铁西区",
                            "code": 956
                        },
                        {
                            "name": "立山区",
                            "code": 957
                        },
                        {
                            "name": "千山区",
                            "code": 958
                        },
                        {
                            "name": "台安县",
                            "code": 959
                        },
                        {
                            "name": "岫岩满族自治县",
                            "code": 960
                        },
                        {
                            "name": "海城市",
                            "code": 961
                        }
                    ]
                },
                {
                    "name": "抚顺市",
                    "code": 167,
                    "sub": [
                        {
                            "name": "新抚区",
                            "code": 962
                        },
                        {
                            "name": "东洲区",
                            "code": 963
                        },
                        {
                            "name": "望花区",
                            "code": 964
                        },
                        {
                            "name": "顺城区",
                            "code": 965
                        },
                        {
                            "name": "抚顺县",
                            "code": 966
                        },
                        {
                            "name": "新宾满族自治县",
                            "code": 967
                        },
                        {
                            "name": "清原满族自治县",
                            "code": 968
                        }
                    ]
                },
                {
                    "name": "本溪市",
                    "code": 168,
                    "sub": [
                        {
                            "name": "平山区",
                            "code": 969
                        },
                        {
                            "name": "溪湖区",
                            "code": 970
                        },
                        {
                            "name": "明山区",
                            "code": 971
                        },
                        {
                            "name": "南芬区",
                            "code": 972
                        },
                        {
                            "name": "本溪满族自治县",
                            "code": 973
                        },
                        {
                            "name": "桓仁满族自治县",
                            "code": 974
                        }
                    ]
                },
                {
                    "name": "丹东市",
                    "code": 169,
                    "sub": [
                        {
                            "name": "元宝区",
                            "code": 975
                        },
                        {
                            "name": "振兴区",
                            "code": 976
                        },
                        {
                            "name": "振安区",
                            "code": 977
                        },
                        {
                            "name": "宽甸满族自治县",
                            "code": 978
                        },
                        {
                            "name": "东港市",
                            "code": 979
                        },
                        {
                            "name": "凤城市",
                            "code": 980
                        }
                    ]
                },
                {
                    "name": "锦州市",
                    "code": 170,
                    "sub": [
                        {
                            "name": "古塔区",
                            "code": 981
                        },
                        {
                            "name": "凌河区",
                            "code": 982
                        },
                        {
                            "name": "太和区",
                            "code": 983
                        },
                        {
                            "name": "黑山县",
                            "code": 984
                        },
                        {
                            "name": "义县",
                            "code": 985
                        },
                        {
                            "name": "凌海市",
                            "code": 986
                        },
                        {
                            "name": "北镇市",
                            "code": 987
                        }
                    ]
                },
                {
                    "name": "营口市",
                    "code": 171,
                    "sub": [
                        {
                            "name": "站前区",
                            "code": 988
                        },
                        {
                            "name": "西市区",
                            "code": 989
                        },
                        {
                            "name": "鲅鱼圈区",
                            "code": 990
                        },
                        {
                            "name": "老边区",
                            "code": 991
                        },
                        {
                            "name": "盖州市",
                            "code": 992
                        },
                        {
                            "name": "大石桥市",
                            "code": 993
                        }
                    ]
                },
                {
                    "name": "阜新市",
                    "code": 172,
                    "sub": [
                        {
                            "name": "海州区",
                            "code": 994
                        },
                        {
                            "name": "新邱区",
                            "code": 995
                        },
                        {
                            "name": "太平区",
                            "code": 996
                        },
                        {
                            "name": "清河门区",
                            "code": 997
                        },
                        {
                            "name": "细河区",
                            "code": 998
                        },
                        {
                            "name": "阜新蒙古族自治县",
                            "code": 999
                        },
                        {
                            "name": "彰武县",
                            "code": 1000
                        }
                    ]
                },
                {
                    "name": "辽阳市",
                    "code": 173,
                    "sub": [
                        {
                            "name": "白塔区",
                            "code": 1001
                        },
                        {
                            "name": "文圣区",
                            "code": 1002
                        },
                        {
                            "name": "宏伟区",
                            "code": 1003
                        },
                        {
                            "name": "弓长岭区",
                            "code": 1004
                        },
                        {
                            "name": "太子河区",
                            "code": 1005
                        },
                        {
                            "name": "辽阳县",
                            "code": 1006
                        },
                        {
                            "name": "灯塔市",
                            "code": 1007
                        }
                    ]
                },
                {
                    "name": "盘锦市",
                    "code": 174,
                    "sub": [
                        {
                            "name": "双台子区",
                            "code": 1008
                        },
                        {
                            "name": "兴隆台区",
                            "code": 1009
                        },
                        {
                            "name": "大洼县",
                            "code": 1010
                        },
                        {
                            "name": "盘山县",
                            "code": 1011
                        }
                    ]
                },
                {
                    "name": "铁岭市",
                    "code": 175,
                    "sub": [
                        {
                            "name": "银州区",
                            "code": 1012
                        },
                        {
                            "name": "清河区",
                            "code": 1013
                        },
                        {
                            "name": "铁岭县",
                            "code": 1014
                        },
                        {
                            "name": "西丰县",
                            "code": 1015
                        },
                        {
                            "name": "昌图县",
                            "code": 1016
                        },
                        {
                            "name": "调兵山市",
                            "code": 1017
                        },
                        {
                            "name": "开原市",
                            "code": 1018
                        }
                    ]
                },
                {
                    "name": "朝阳市",
                    "code": 176,
                    "sub": [
                        {
                            "name": "双塔区",
                            "code": 1019
                        },
                        {
                            "name": "龙城区",
                            "code": 1020
                        },
                        {
                            "name": "朝阳县",
                            "code": 1021
                        },
                        {
                            "name": "建平县",
                            "code": 1022
                        },
                        {
                            "name": "喀喇沁左翼蒙古族自治县",
                            "code": 1023
                        },
                        {
                            "name": "北票市",
                            "code": 1024
                        },
                        {
                            "name": "凌源市",
                            "code": 1025
                        }
                    ]
                },
                {
                    "name": "葫芦岛市",
                    "code": 177,
                    "sub": [
                        {
                            "name": "连山区",
                            "code": 1026
                        },
                        {
                            "name": "龙港区",
                            "code": 1027
                        },
                        {
                            "name": "南票区",
                            "code": 1028
                        },
                        {
                            "name": "绥中县",
                            "code": 1029
                        },
                        {
                            "name": "建昌县",
                            "code": 1030
                        },
                        {
                            "name": "兴城市",
                            "code": 1031
                        }
                    ]
                }
            ]
        },
        {
            "name": "吉林省",
            "code": 10,
            "sub": [
                {
                    "name": "长春市",
                    "code": 178,
                    "sub": [
                        {
                            "name": "南关区",
                            "code": 1032
                        },
                        {
                            "name": "宽城区",
                            "code": 1033
                        },
                        {
                            "name": "朝阳区",
                            "code": 1034
                        },
                        {
                            "name": "二道区",
                            "code": 1035
                        },
                        {
                            "name": "绿园区",
                            "code": 1036
                        },
                        {
                            "name": "双阳区",
                            "code": 1037
                        },
                        {
                            "name": "农安县",
                            "code": 1038
                        },
                        {
                            "name": "九台市",
                            "code": 1039
                        },
                        {
                            "name": "榆树市",
                            "code": 1040
                        },
                        {
                            "name": "德惠市",
                            "code": 1041
                        }
                    ]
                },
                {
                    "name": "吉林市",
                    "code": 179,
                    "sub": [
                        {
                            "name": "昌邑区",
                            "code": 1042
                        },
                        {
                            "name": "龙潭区",
                            "code": 1043
                        },
                        {
                            "name": "船营区",
                            "code": 1044
                        },
                        {
                            "name": "丰满区",
                            "code": 1045
                        },
                        {
                            "name": "永吉县",
                            "code": 1046
                        },
                        {
                            "name": "蛟河市",
                            "code": 1047
                        },
                        {
                            "name": "桦甸市",
                            "code": 1048
                        },
                        {
                            "name": "舒兰市",
                            "code": 1049
                        },
                        {
                            "name": "磐石市",
                            "code": 1050
                        }
                    ]
                },
                {
                    "name": "四平市",
                    "code": 180,
                    "sub": [
                        {
                            "name": "铁西区",
                            "code": 1051
                        },
                        {
                            "name": "铁东区",
                            "code": 1052
                        },
                        {
                            "name": "梨树县",
                            "code": 1053
                        },
                        {
                            "name": "伊通满族自治县",
                            "code": 1054
                        },
                        {
                            "name": "公主岭市",
                            "code": 1055
                        },
                        {
                            "name": "双辽市",
                            "code": 1056
                        }
                    ]
                },
                {
                    "name": "辽源市",
                    "code": 181,
                    "sub": [
                        {
                            "name": "龙山区",
                            "code": 1057
                        },
                        {
                            "name": "西安区",
                            "code": 1058
                        },
                        {
                            "name": "东丰县",
                            "code": 1059
                        },
                        {
                            "name": "东辽县",
                            "code": 1060
                        }
                    ]
                },
                {
                    "name": "通化市",
                    "code": 182,
                    "sub": [
                        {
                            "name": "东昌区",
                            "code": 1061
                        },
                        {
                            "name": "二道江区",
                            "code": 1062
                        },
                        {
                            "name": "通化县",
                            "code": 1063
                        },
                        {
                            "name": "辉南县",
                            "code": 1064
                        },
                        {
                            "name": "柳河县",
                            "code": 1065
                        },
                        {
                            "name": "梅河口市",
                            "code": 1066
                        },
                        {
                            "name": "集安市",
                            "code": 1067
                        }
                    ]
                },
                {
                    "name": "白山市",
                    "code": 183,
                    "sub": [
                        {
                            "name": "八道江区",
                            "code": 1068
                        },
                        {
                            "name": "抚松县",
                            "code": 1069
                        },
                        {
                            "name": "靖宇县",
                            "code": 1070
                        },
                        {
                            "name": "长白朝鲜族自治县",
                            "code": 1071
                        },
                        {
                            "name": "江源县",
                            "code": 1072
                        },
                        {
                            "name": "临江市",
                            "code": 1073
                        }
                    ]
                },
                {
                    "name": "松原市",
                    "code": 184,
                    "sub": [
                        {
                            "name": "宁江区",
                            "code": 1074
                        },
                        {
                            "name": "前郭尔罗斯蒙古族自治县",
                            "code": 1075
                        },
                        {
                            "name": "长岭县",
                            "code": 1076
                        },
                        {
                            "name": "乾安县",
                            "code": 1077
                        },
                        {
                            "name": "扶余县",
                            "code": 1078
                        }
                    ]
                },
                {
                    "name": "白城市",
                    "code": 185,
                    "sub": [
                        {
                            "name": "洮北区",
                            "code": 1079
                        },
                        {
                            "name": "镇赉县",
                            "code": 1080
                        },
                        {
                            "name": "通榆县",
                            "code": 1081
                        },
                        {
                            "name": "洮南市",
                            "code": 1082
                        },
                        {
                            "name": "大安市",
                            "code": 1083
                        }
                    ]
                },
                {
                    "name": "延边",
                    "code": 186,
                    "sub": [
                        {
                            "name": "延吉市",
                            "code": 1084
                        },
                        {
                            "name": "图们市",
                            "code": 1085
                        },
                        {
                            "name": "敦化市",
                            "code": 1086
                        },
                        {
                            "name": "珲春市",
                            "code": 1087
                        },
                        {
                            "name": "龙井市",
                            "code": 1088
                        },
                        {
                            "name": "和龙市",
                            "code": 1089
                        },
                        {
                            "name": "汪清县",
                            "code": 1090
                        },
                        {
                            "name": "安图县",
                            "code": 1091
                        }
                    ]
                }
            ]
        },
        {
            "name": "黑龙江省",
            "code": 11,
            "sub": [
                {
                    "name": "哈尔滨市",
                    "code": 187,
                    "sub": [
                        {
                            "name": "道里区",
                            "code": 1092
                        },
                        {
                            "name": "南岗区",
                            "code": 1093
                        },
                        {
                            "name": "道外区",
                            "code": 1094
                        },
                        {
                            "name": "香坊区",
                            "code": 1095
                        },
                        {
                            "name": "动力区",
                            "code": 1096
                        },
                        {
                            "name": "平房区",
                            "code": 1097
                        },
                        {
                            "name": "松北区",
                            "code": 1098
                        },
                        {
                            "name": "呼兰区",
                            "code": 1099
                        },
                        {
                            "name": "依兰县",
                            "code": 1100
                        },
                        {
                            "name": "方正县",
                            "code": 1101
                        },
                        {
                            "name": "宾县",
                            "code": 1102
                        },
                        {
                            "name": "巴彦县",
                            "code": 1103
                        },
                        {
                            "name": "木兰县",
                            "code": 1104
                        },
                        {
                            "name": "通河县",
                            "code": 1105
                        },
                        {
                            "name": "延寿县",
                            "code": 1106
                        },
                        {
                            "name": "阿城市",
                            "code": 1107
                        },
                        {
                            "name": "双城市",
                            "code": 1108
                        },
                        {
                            "name": "尚志市",
                            "code": 1109
                        },
                        {
                            "name": "五常市",
                            "code": 1110
                        }
                    ]
                },
                {
                    "name": "齐齐哈尔市",
                    "code": 188,
                    "sub": [
                        {
                            "name": "龙沙区",
                            "code": 1111
                        },
                        {
                            "name": "建华区",
                            "code": 1112
                        },
                        {
                            "name": "铁锋区",
                            "code": 1113
                        },
                        {
                            "name": "昂昂溪区",
                            "code": 1114
                        },
                        {
                            "name": "富拉尔基区",
                            "code": 1115
                        },
                        {
                            "name": "碾子山区",
                            "code": 1116
                        },
                        {
                            "name": "梅里斯达斡尔族区",
                            "code": 1117
                        },
                        {
                            "name": "龙江县",
                            "code": 1118
                        },
                        {
                            "name": "依安县",
                            "code": 1119
                        },
                        {
                            "name": "泰来县",
                            "code": 1120
                        },
                        {
                            "name": "甘南县",
                            "code": 1121
                        },
                        {
                            "name": "富裕县",
                            "code": 1122
                        },
                        {
                            "name": "克山县",
                            "code": 1123
                        },
                        {
                            "name": "克东县",
                            "code": 1124
                        },
                        {
                            "name": "拜泉县",
                            "code": 1125
                        },
                        {
                            "name": "讷河市",
                            "code": 1126
                        }
                    ]
                },
                {
                    "name": "鸡西市",
                    "code": 189,
                    "sub": [
                        {
                            "name": "鸡冠区",
                            "code": 1127
                        },
                        {
                            "name": "恒山区",
                            "code": 1128
                        },
                        {
                            "name": "滴道区",
                            "code": 1129
                        },
                        {
                            "name": "梨树区",
                            "code": 1130
                        },
                        {
                            "name": "城子河区",
                            "code": 1131
                        },
                        {
                            "name": "麻山区",
                            "code": 1132
                        },
                        {
                            "name": "鸡东县",
                            "code": 1133
                        },
                        {
                            "name": "虎林市",
                            "code": 1134
                        },
                        {
                            "name": "密山市",
                            "code": 1135
                        }
                    ]
                },
                {
                    "name": "鹤岗市",
                    "code": 190,
                    "sub": [
                        {
                            "name": "向阳区",
                            "code": 1136
                        },
                        {
                            "name": "工农区",
                            "code": 1137
                        },
                        {
                            "name": "南山区",
                            "code": 1138
                        },
                        {
                            "name": "兴安区",
                            "code": 1139
                        },
                        {
                            "name": "东山区",
                            "code": 1140
                        },
                        {
                            "name": "兴山区",
                            "code": 1141
                        },
                        {
                            "name": "萝北县",
                            "code": 1142
                        },
                        {
                            "name": "绥滨县",
                            "code": 1143
                        }
                    ]
                },
                {
                    "name": "双鸭山市",
                    "code": 191,
                    "sub": [
                        {
                            "name": "尖山区",
                            "code": 1144
                        },
                        {
                            "name": "岭东区",
                            "code": 1145
                        },
                        {
                            "name": "四方台区",
                            "code": 1146
                        },
                        {
                            "name": "宝山区",
                            "code": 1147
                        },
                        {
                            "name": "集贤县",
                            "code": 1148
                        },
                        {
                            "name": "友谊县",
                            "code": 1149
                        },
                        {
                            "name": "宝清县",
                            "code": 1150
                        },
                        {
                            "name": "饶河县",
                            "code": 1151
                        }
                    ]
                },
                {
                    "name": "大庆市",
                    "code": 192,
                    "sub": [
                        {
                            "name": "萨尔图区",
                            "code": 1152
                        },
                        {
                            "name": "龙凤区",
                            "code": 1153
                        },
                        {
                            "name": "让胡路区",
                            "code": 1154
                        },
                        {
                            "name": "红岗区",
                            "code": 1155
                        },
                        {
                            "name": "大同区",
                            "code": 1156
                        },
                        {
                            "name": "肇州县",
                            "code": 1157
                        },
                        {
                            "name": "肇源县",
                            "code": 1158
                        },
                        {
                            "name": "林甸县",
                            "code": 1159
                        },
                        {
                            "name": "杜尔伯特蒙古族自治县",
                            "code": 1160
                        }
                    ]
                },
                {
                    "name": "伊春市",
                    "code": 193,
                    "sub": [
                        {
                            "name": "伊春区",
                            "code": 1161
                        },
                        {
                            "name": "南岔区",
                            "code": 1162
                        },
                        {
                            "name": "友好区",
                            "code": 1163
                        },
                        {
                            "name": "西林区",
                            "code": 1164
                        },
                        {
                            "name": "翠峦区",
                            "code": 1165
                        },
                        {
                            "name": "新青区",
                            "code": 1166
                        },
                        {
                            "name": "美溪区",
                            "code": 1167
                        },
                        {
                            "name": "金山屯区",
                            "code": 1168
                        },
                        {
                            "name": "五营区",
                            "code": 1169
                        },
                        {
                            "name": "乌马河区",
                            "code": 1170
                        },
                        {
                            "name": "汤旺河区",
                            "code": 1171
                        },
                        {
                            "name": "带岭区",
                            "code": 1172
                        },
                        {
                            "name": "乌伊岭区",
                            "code": 1173
                        },
                        {
                            "name": "红星区",
                            "code": 1174
                        },
                        {
                            "name": "上甘岭区",
                            "code": 1175
                        },
                        {
                            "name": "嘉荫县",
                            "code": 1176
                        },
                        {
                            "name": "铁力市",
                            "code": 1177
                        }
                    ]
                },
                {
                    "name": "佳木斯市",
                    "code": 194,
                    "sub": [
                        {
                            "name": "永红区",
                            "code": 1178
                        },
                        {
                            "name": "向阳区",
                            "code": 1179
                        },
                        {
                            "name": "前进区",
                            "code": 1180
                        },
                        {
                            "name": "东风区",
                            "code": 1181
                        },
                        {
                            "name": "郊区",
                            "code": 1182
                        },
                        {
                            "name": "桦南县",
                            "code": 1183
                        },
                        {
                            "name": "桦川县",
                            "code": 1184
                        },
                        {
                            "name": "汤原县",
                            "code": 1185
                        },
                        {
                            "name": "抚远县",
                            "code": 1186
                        },
                        {
                            "name": "同江市",
                            "code": 1187
                        },
                        {
                            "name": "富锦市",
                            "code": 1188
                        }
                    ]
                },
                {
                    "name": "七台河市",
                    "code": 195,
                    "sub": [
                        {
                            "name": "新兴区",
                            "code": 1189
                        },
                        {
                            "name": "桃山区",
                            "code": 1190
                        },
                        {
                            "name": "茄子河区",
                            "code": 1191
                        },
                        {
                            "name": "勃利县",
                            "code": 1192
                        }
                    ]
                },
                {
                    "name": "牡丹江市",
                    "code": 196,
                    "sub": [
                        {
                            "name": "东安区",
                            "code": 1193
                        },
                        {
                            "name": "阳明区",
                            "code": 1194
                        },
                        {
                            "name": "爱民区",
                            "code": 1195
                        },
                        {
                            "name": "西安区",
                            "code": 1196
                        },
                        {
                            "name": "东宁县",
                            "code": 1197
                        },
                        {
                            "name": "林口县",
                            "code": 1198
                        },
                        {
                            "name": "绥芬河市",
                            "code": 1199
                        },
                        {
                            "name": "海林市",
                            "code": 1200
                        },
                        {
                            "name": "宁安市",
                            "code": 1201
                        },
                        {
                            "name": "穆棱市",
                            "code": 1202
                        }
                    ]
                },
                {
                    "name": "黑河市",
                    "code": 197,
                    "sub": [
                        {
                            "name": "爱辉区",
                            "code": 1203
                        },
                        {
                            "name": "嫩江县",
                            "code": 1204
                        },
                        {
                            "name": "逊克县",
                            "code": 1205
                        },
                        {
                            "name": "孙吴县",
                            "code": 1206
                        },
                        {
                            "name": "北安市",
                            "code": 1207
                        },
                        {
                            "name": "五大连池市",
                            "code": 1208
                        }
                    ]
                },
                {
                    "name": "绥化市",
                    "code": 198,
                    "sub": [
                        {
                            "name": "北林区",
                            "code": 1209
                        },
                        {
                            "name": "望奎县",
                            "code": 1210
                        },
                        {
                            "name": "兰西县",
                            "code": 1211
                        },
                        {
                            "name": "青冈县",
                            "code": 1212
                        },
                        {
                            "name": "庆安县",
                            "code": 1213
                        },
                        {
                            "name": "明水县",
                            "code": 1214
                        },
                        {
                            "name": "绥棱县",
                            "code": 1215
                        },
                        {
                            "name": "安达市",
                            "code": 1216
                        },
                        {
                            "name": "肇东市",
                            "code": 1217
                        },
                        {
                            "name": "海伦市",
                            "code": 1218
                        }
                    ]
                },
                {
                    "name": "大兴安岭地区",
                    "code": 199,
                    "sub": [
                        {
                            "name": "呼玛县",
                            "code": 1219
                        },
                        {
                            "name": "塔河县",
                            "code": 1220
                        },
                        {
                            "name": "漠河县",
                            "code": 1221
                        }
                    ]
                }
            ]
        },
        {
            "name": "江苏省",
            "code": 12,
            "sub": [
                {
                    "name": "南京市",
                    "code": 200,
                    "sub": [
                        {
                            "name": "玄武区",
                            "code": 1222
                        },
                        {
                            "name": "白下区",
                            "code": 1223
                        },
                        {
                            "name": "秦淮区",
                            "code": 1224
                        },
                        {
                            "name": "建邺区",
                            "code": 1225
                        },
                        {
                            "name": "鼓楼区",
                            "code": 1226
                        },
                        {
                            "name": "下关区",
                            "code": 1227
                        },
                        {
                            "name": "浦口区",
                            "code": 1228
                        },
                        {
                            "name": "栖霞区",
                            "code": 1229
                        },
                        {
                            "name": "雨花台区",
                            "code": 1230
                        },
                        {
                            "name": "江宁区",
                            "code": 1231
                        },
                        {
                            "name": "六合区",
                            "code": 1232
                        },
                        {
                            "name": "溧水县",
                            "code": 1233
                        },
                        {
                            "name": "高淳县",
                            "code": 1234
                        }
                    ]
                },
                {
                    "name": "无锡市",
                    "code": 201,
                    "sub": [
                        {
                            "name": "崇安区",
                            "code": 1235
                        },
                        {
                            "name": "南长区",
                            "code": 1236
                        },
                        {
                            "name": "北塘区",
                            "code": 1237
                        },
                        {
                            "name": "锡山区",
                            "code": 1238
                        },
                        {
                            "name": "惠山区",
                            "code": 1239
                        },
                        {
                            "name": "滨湖区",
                            "code": 1240
                        },
                        {
                            "name": "江阴市",
                            "code": 1241
                        },
                        {
                            "name": "宜兴市",
                            "code": 1242
                        }
                    ]
                },
                {
                    "name": "徐州市",
                    "code": 202,
                    "sub": [
                        {
                            "name": "鼓楼区",
                            "code": 1243
                        },
                        {
                            "name": "云龙区",
                            "code": 1244
                        },
                        {
                            "name": "九里区",
                            "code": 1245
                        },
                        {
                            "name": "贾汪区",
                            "code": 1246
                        },
                        {
                            "name": "泉山区",
                            "code": 1247
                        },
                        {
                            "name": "丰县",
                            "code": 1248
                        },
                        {
                            "name": "沛县",
                            "code": 1249
                        },
                        {
                            "name": "铜山县",
                            "code": 1250
                        },
                        {
                            "name": "睢宁县",
                            "code": 1251
                        },
                        {
                            "name": "新沂市",
                            "code": 1252
                        },
                        {
                            "name": "邳州市",
                            "code": 1253
                        }
                    ]
                },
                {
                    "name": "常州市",
                    "code": 203,
                    "sub": [
                        {
                            "name": "天宁区",
                            "code": 1254
                        },
                        {
                            "name": "钟楼区",
                            "code": 1255
                        },
                        {
                            "name": "戚墅堰区",
                            "code": 1256
                        },
                        {
                            "name": "新北区",
                            "code": 1257
                        },
                        {
                            "name": "武进区",
                            "code": 1258
                        },
                        {
                            "name": "溧阳市",
                            "code": 1259
                        },
                        {
                            "name": "金坛市",
                            "code": 1260
                        }
                    ]
                },
                {
                    "name": "苏州市",
                    "code": 204,
                    "sub": [
                        {
                            "name": "沧浪区",
                            "code": 1261
                        },
                        {
                            "name": "平江区",
                            "code": 1262
                        },
                        {
                            "name": "金阊区",
                            "code": 1263
                        },
                        {
                            "name": "虎丘区",
                            "code": 1264
                        },
                        {
                            "name": "吴中区",
                            "code": 1265
                        },
                        {
                            "name": "相城区",
                            "code": 1266
                        },
                        {
                            "name": "常熟市",
                            "code": 1267
                        },
                        {
                            "name": "张家港市",
                            "code": 1268
                        },
                        {
                            "name": "昆山市",
                            "code": 1269
                        },
                        {
                            "name": "吴江市",
                            "code": 1270
                        },
                        {
                            "name": "太仓市",
                            "code": 1271
                        }
                    ]
                },
                {
                    "name": "南通市",
                    "code": 205,
                    "sub": [
                        {
                            "name": "崇川区",
                            "code": 1272
                        },
                        {
                            "name": "港闸区",
                            "code": 1273
                        },
                        {
                            "name": "海安县",
                            "code": 1274
                        },
                        {
                            "name": "如东县",
                            "code": 1275
                        },
                        {
                            "name": "启东市",
                            "code": 1276
                        },
                        {
                            "name": "如皋市",
                            "code": 1277
                        },
                        {
                            "name": "通州市",
                            "code": 1278
                        },
                        {
                            "name": "海门市",
                            "code": 1279
                        }
                    ]
                },
                {
                    "name": "连云港市",
                    "code": 206,
                    "sub": [
                        {
                            "name": "连云区",
                            "code": 1280
                        },
                        {
                            "name": "新浦区",
                            "code": 1281
                        },
                        {
                            "name": "海州区",
                            "code": 1282
                        },
                        {
                            "name": "赣榆县",
                            "code": 1283
                        },
                        {
                            "name": "东海县",
                            "code": 1284
                        },
                        {
                            "name": "灌云县",
                            "code": 1285
                        },
                        {
                            "name": "灌南县",
                            "code": 1286
                        }
                    ]
                },
                {
                    "name": "淮安市",
                    "code": 207,
                    "sub": [
                        {
                            "name": "清河区",
                            "code": 1287
                        },
                        {
                            "name": "楚州区",
                            "code": 1288
                        },
                        {
                            "name": "淮阴区",
                            "code": 1289
                        },
                        {
                            "name": "清浦区",
                            "code": 1290
                        },
                        {
                            "name": "涟水县",
                            "code": 1291
                        },
                        {
                            "name": "洪泽县",
                            "code": 1292
                        },
                        {
                            "name": "盱眙县",
                            "code": 1293
                        },
                        {
                            "name": "金湖县",
                            "code": 1294
                        }
                    ]
                },
                {
                    "name": "盐城市",
                    "code": 208,
                    "sub": [
                        {
                            "name": "亭湖区",
                            "code": 1295
                        },
                        {
                            "name": "盐都区",
                            "code": 1296
                        },
                        {
                            "name": "响水县",
                            "code": 1297
                        },
                        {
                            "name": "滨海县",
                            "code": 1298
                        },
                        {
                            "name": "阜宁县",
                            "code": 1299
                        },
                        {
                            "name": "射阳县",
                            "code": 1300
                        },
                        {
                            "name": "建湖县",
                            "code": 1301
                        },
                        {
                            "name": "东台市",
                            "code": 1302
                        },
                        {
                            "name": "大丰市",
                            "code": 1303
                        }
                    ]
                },
                {
                    "name": "扬州市",
                    "code": 209,
                    "sub": [
                        {
                            "name": "广陵区",
                            "code": 1304
                        },
                        {
                            "name": "邗江区",
                            "code": 1305
                        },
                        {
                            "name": "维扬区",
                            "code": 1306
                        },
                        {
                            "name": "宝应县",
                            "code": 1307
                        },
                        {
                            "name": "仪征市",
                            "code": 1308
                        },
                        {
                            "name": "高邮市",
                            "code": 1309
                        },
                        {
                            "name": "江都市",
                            "code": 1310
                        }
                    ]
                },
                {
                    "name": "镇江市",
                    "code": 210,
                    "sub": [
                        {
                            "name": "京口区",
                            "code": 1311
                        },
                        {
                            "name": "润州区",
                            "code": 1312
                        },
                        {
                            "name": "丹徒区",
                            "code": 1313
                        },
                        {
                            "name": "丹阳市",
                            "code": 1314
                        },
                        {
                            "name": "扬中市",
                            "code": 1315
                        },
                        {
                            "name": "句容市",
                            "code": 1316
                        }
                    ]
                },
                {
                    "name": "泰州市",
                    "code": 211,
                    "sub": [
                        {
                            "name": "海陵区",
                            "code": 1317
                        },
                        {
                            "name": "高港区",
                            "code": 1318
                        },
                        {
                            "name": "兴化市",
                            "code": 1319
                        },
                        {
                            "name": "靖江市",
                            "code": 1320
                        },
                        {
                            "name": "泰兴市",
                            "code": 1321
                        },
                        {
                            "name": "姜堰市",
                            "code": 1322
                        }
                    ]
                },
                {
                    "name": "宿迁市",
                    "code": 212,
                    "sub": [
                        {
                            "name": "宿城区",
                            "code": 1323
                        },
                        {
                            "name": "宿豫区",
                            "code": 1324
                        },
                        {
                            "name": "沭阳县",
                            "code": 1325
                        },
                        {
                            "name": "泗阳县",
                            "code": 1326
                        },
                        {
                            "name": "泗洪县",
                            "code": 1327
                        }
                    ]
                }
            ]
        },
        {
            "name": "浙江省",
            "code": 13,
            "sub": [
                {
                    "name": "杭州市",
                    "code": 213,
                    "sub": [
                        {
                            "name": "上城区",
                            "code": 1328
                        },
                        {
                            "name": "下城区",
                            "code": 1329
                        },
                        {
                            "name": "江干区",
                            "code": 1330
                        },
                        {
                            "name": "拱墅区",
                            "code": 1331
                        },
                        {
                            "name": "西湖区",
                            "code": 1332
                        },
                        {
                            "name": "滨江区",
                            "code": 1333
                        },
                        {
                            "name": "萧山区",
                            "code": 1334
                        },
                        {
                            "name": "余杭区",
                            "code": 1335
                        },
                        {
                            "name": "桐庐县",
                            "code": 1336
                        },
                        {
                            "name": "淳安县",
                            "code": 1337
                        },
                        {
                            "name": "建德市",
                            "code": 1338
                        },
                        {
                            "name": "富阳市",
                            "code": 1339
                        },
                        {
                            "name": "临安市",
                            "code": 1340
                        }
                    ]
                },
                {
                    "name": "宁波市",
                    "code": 214,
                    "sub": [
                        {
                            "name": "海曙区",
                            "code": 1341
                        },
                        {
                            "name": "江东区",
                            "code": 1342
                        },
                        {
                            "name": "江北区",
                            "code": 1343
                        },
                        {
                            "name": "北仑区",
                            "code": 1344
                        },
                        {
                            "name": "镇海区",
                            "code": 1345
                        },
                        {
                            "name": "鄞州区",
                            "code": 1346
                        },
                        {
                            "name": "象山县",
                            "code": 1347
                        },
                        {
                            "name": "宁海县",
                            "code": 1348
                        },
                        {
                            "name": "余姚市",
                            "code": 1349
                        },
                        {
                            "name": "慈溪市",
                            "code": 1350
                        },
                        {
                            "name": "奉化市",
                            "code": 1351
                        }
                    ]
                },
                {
                    "name": "温州市",
                    "code": 215,
                    "sub": [
                        {
                            "name": "鹿城区",
                            "code": 1352
                        },
                        {
                            "name": "龙湾区",
                            "code": 1353
                        },
                        {
                            "name": "瓯海区",
                            "code": 1354
                        },
                        {
                            "name": "洞头县",
                            "code": 1355
                        },
                        {
                            "name": "永嘉县",
                            "code": 1356
                        },
                        {
                            "name": "平阳县",
                            "code": 1357
                        },
                        {
                            "name": "苍南县",
                            "code": 1358
                        },
                        {
                            "name": "文成县",
                            "code": 1359
                        },
                        {
                            "name": "泰顺县",
                            "code": 1360
                        },
                        {
                            "name": "瑞安市",
                            "code": 1361
                        },
                        {
                            "name": "乐清市",
                            "code": 1362
                        }
                    ]
                },
                {
                    "name": "嘉兴市",
                    "code": 216,
                    "sub": [
                        {
                            "name": "秀城区",
                            "code": 1363
                        },
                        {
                            "name": "秀洲区",
                            "code": 1364
                        },
                        {
                            "name": "嘉善县",
                            "code": 1365
                        },
                        {
                            "name": "海盐县",
                            "code": 1366
                        },
                        {
                            "name": "海宁市",
                            "code": 1367
                        },
                        {
                            "name": "平湖市",
                            "code": 1368
                        },
                        {
                            "name": "桐乡市",
                            "code": 1369
                        }
                    ]
                },
                {
                    "name": "湖州市",
                    "code": 217,
                    "sub": [
                        {
                            "name": "吴兴区",
                            "code": 1370
                        },
                        {
                            "name": "南浔区",
                            "code": 1371
                        },
                        {
                            "name": "德清县",
                            "code": 1372
                        },
                        {
                            "name": "长兴县",
                            "code": 1373
                        },
                        {
                            "name": "安吉县",
                            "code": 1374
                        }
                    ]
                },
                {
                    "name": "绍兴市",
                    "code": 218,
                    "sub": [
                        {
                            "name": "越城区",
                            "code": 1375
                        },
                        {
                            "name": "绍兴县",
                            "code": 1376
                        },
                        {
                            "name": "新昌县",
                            "code": 1377
                        },
                        {
                            "name": "诸暨市",
                            "code": 1378
                        },
                        {
                            "name": "上虞市",
                            "code": 1379
                        },
                        {
                            "name": "嵊州市",
                            "code": 1380
                        }
                    ]
                },
                {
                    "name": "金华市",
                    "code": 219,
                    "sub": [
                        {
                            "name": "婺城区",
                            "code": 1381
                        },
                        {
                            "name": "金东区",
                            "code": 1382
                        },
                        {
                            "name": "武义县",
                            "code": 1383
                        },
                        {
                            "name": "浦江县",
                            "code": 1384
                        },
                        {
                            "name": "磐安县",
                            "code": 1385
                        },
                        {
                            "name": "兰溪市",
                            "code": 1386
                        },
                        {
                            "name": "义乌市",
                            "code": 1387
                        },
                        {
                            "name": "东阳市",
                            "code": 1388
                        },
                        {
                            "name": "永康市",
                            "code": 1389
                        }
                    ]
                },
                {
                    "name": "衢州市",
                    "code": 220,
                    "sub": [
                        {
                            "name": "柯城区",
                            "code": 1390
                        },
                        {
                            "name": "衢江区",
                            "code": 1391
                        },
                        {
                            "name": "常山县",
                            "code": 1392
                        },
                        {
                            "name": "开化县",
                            "code": 1393
                        },
                        {
                            "name": "龙游县",
                            "code": 1394
                        },
                        {
                            "name": "江山市",
                            "code": 1395
                        }
                    ]
                },
                {
                    "name": "舟山市",
                    "code": 221,
                    "sub": [
                        {
                            "name": "定海区",
                            "code": 1396
                        },
                        {
                            "name": "普陀区",
                            "code": 1397
                        },
                        {
                            "name": "岱山县",
                            "code": 1398
                        },
                        {
                            "name": "嵊泗县",
                            "code": 1399
                        }
                    ]
                },
                {
                    "name": "台州市",
                    "code": 222,
                    "sub": [
                        {
                            "name": "椒江区",
                            "code": 1400
                        },
                        {
                            "name": "黄岩区",
                            "code": 1401
                        },
                        {
                            "name": "路桥区",
                            "code": 1402
                        },
                        {
                            "name": "玉环县",
                            "code": 1403
                        },
                        {
                            "name": "三门县",
                            "code": 1404
                        },
                        {
                            "name": "天台县",
                            "code": 1405
                        },
                        {
                            "name": "仙居县",
                            "code": 1406
                        },
                        {
                            "name": "温岭市",
                            "code": 1407
                        },
                        {
                            "name": "临海市",
                            "code": 1408
                        }
                    ]
                },
                {
                    "name": "丽水市",
                    "code": 223,
                    "sub": [
                        {
                            "name": "莲都区",
                            "code": 1409
                        },
                        {
                            "name": "青田县",
                            "code": 1410
                        },
                        {
                            "name": "缙云县",
                            "code": 1411
                        },
                        {
                            "name": "遂昌县",
                            "code": 1412
                        },
                        {
                            "name": "松阳县",
                            "code": 1413
                        },
                        {
                            "name": "云和县",
                            "code": 1414
                        },
                        {
                            "name": "庆元县",
                            "code": 1415
                        },
                        {
                            "name": "景宁畲族自治县",
                            "code": 1416
                        },
                        {
                            "name": "龙泉市",
                            "code": 1417
                        }
                    ]
                }
            ]
        },
        {
            "name": "安徽省",
            "code": 14,
            "sub": [
                {
                    "name": "合肥市",
                    "code": 224,
                    "sub": [
                        {
                            "name": "瑶海区",
                            "code": 1418
                        },
                        {
                            "name": "庐阳区",
                            "code": 1419
                        },
                        {
                            "name": "蜀山区",
                            "code": 1420
                        },
                        {
                            "name": "包河区",
                            "code": 1421
                        },
                        {
                            "name": "长丰县",
                            "code": 1422
                        },
                        {
                            "name": "肥东县",
                            "code": 1423
                        },
                        {
                            "name": "肥西县",
                            "code": 1424
                        }
                    ]
                },
                {
                    "name": "芜湖市",
                    "code": 225,
                    "sub": [
                        {
                            "name": "镜湖区",
                            "code": 1425
                        },
                        {
                            "name": "弋江区",
                            "code": 1426
                        },
                        {
                            "name": "鸠江区",
                            "code": 1427
                        },
                        {
                            "name": "三山区",
                            "code": 1428
                        },
                        {
                            "name": "芜湖县",
                            "code": 1429
                        },
                        {
                            "name": "繁昌县",
                            "code": 1430
                        },
                        {
                            "name": "南陵县",
                            "code": 1431
                        }
                    ]
                },
                {
                    "name": "蚌埠市",
                    "code": 226,
                    "sub": [
                        {
                            "name": "龙子湖区",
                            "code": 1432
                        },
                        {
                            "name": "蚌山区",
                            "code": 1433
                        },
                        {
                            "name": "禹会区",
                            "code": 1434
                        },
                        {
                            "name": "淮上区",
                            "code": 1435
                        },
                        {
                            "name": "怀远县",
                            "code": 1436
                        },
                        {
                            "name": "五河县",
                            "code": 1437
                        },
                        {
                            "name": "固镇县",
                            "code": 1438
                        }
                    ]
                },
                {
                    "name": "淮南市",
                    "code": 227,
                    "sub": [
                        {
                            "name": "大通区",
                            "code": 1439
                        },
                        {
                            "name": "田家庵区",
                            "code": 1440
                        },
                        {
                            "name": "谢家集区",
                            "code": 1441
                        },
                        {
                            "name": "八公山区",
                            "code": 1442
                        },
                        {
                            "name": "潘集区",
                            "code": 1443
                        },
                        {
                            "name": "凤台县",
                            "code": 1444
                        }
                    ]
                },
                {
                    "name": "马鞍山市",
                    "code": 228,
                    "sub": [
                        {
                            "name": "金家庄区",
                            "code": 1445
                        },
                        {
                            "name": "花山区",
                            "code": 1446
                        },
                        {
                            "name": "雨山区",
                            "code": 1447
                        },
                        {
                            "name": "当涂县",
                            "code": 1448
                        }
                    ]
                },
                {
                    "name": "淮北市",
                    "code": 229,
                    "sub": [
                        {
                            "name": "杜集区",
                            "code": 1449
                        },
                        {
                            "name": "相山区",
                            "code": 1450
                        },
                        {
                            "name": "烈山区",
                            "code": 1451
                        },
                        {
                            "name": "濉溪县",
                            "code": 1452
                        }
                    ]
                },
                {
                    "name": "铜陵市",
                    "code": 230,
                    "sub": [
                        {
                            "name": "铜官山区",
                            "code": 1453
                        },
                        {
                            "name": "狮子山区",
                            "code": 1454
                        },
                        {
                            "name": "郊区",
                            "code": 1455
                        },
                        {
                            "name": "铜陵县",
                            "code": 1456
                        }
                    ]
                },
                {
                    "name": "安庆市",
                    "code": 231,
                    "sub": [
                        {
                            "name": "迎江区",
                            "code": 1457
                        },
                        {
                            "name": "大观区",
                            "code": 1458
                        },
                        {
                            "name": "宜秀区",
                            "code": 1459
                        },
                        {
                            "name": "怀宁县",
                            "code": 1460
                        },
                        {
                            "name": "枞阳县",
                            "code": 1461
                        },
                        {
                            "name": "潜山县",
                            "code": 1462
                        },
                        {
                            "name": "太湖县",
                            "code": 1463
                        },
                        {
                            "name": "宿松县",
                            "code": 1464
                        },
                        {
                            "name": "望江县",
                            "code": 1465
                        },
                        {
                            "name": "岳西县",
                            "code": 1466
                        },
                        {
                            "name": "桐城市",
                            "code": 1467
                        }
                    ]
                },
                {
                    "name": "黄山市",
                    "code": 232,
                    "sub": [
                        {
                            "name": "屯溪区",
                            "code": 1468
                        },
                        {
                            "name": "黄山区",
                            "code": 1469
                        },
                        {
                            "name": "徽州区",
                            "code": 1470
                        },
                        {
                            "name": "歙县",
                            "code": 1471
                        },
                        {
                            "name": "休宁县",
                            "code": 1472
                        },
                        {
                            "name": "黟县",
                            "code": 1473
                        },
                        {
                            "name": "祁门县",
                            "code": 1474
                        }
                    ]
                },
                {
                    "name": "滁州市",
                    "code": 233,
                    "sub": [
                        {
                            "name": "琅琊区",
                            "code": 1475
                        },
                        {
                            "name": "南谯区",
                            "code": 1476
                        },
                        {
                            "name": "来安县",
                            "code": 1477
                        },
                        {
                            "name": "全椒县",
                            "code": 1478
                        },
                        {
                            "name": "定远县",
                            "code": 1479
                        },
                        {
                            "name": "凤阳县",
                            "code": 1480
                        },
                        {
                            "name": "天长市",
                            "code": 1481
                        },
                        {
                            "name": "明光市",
                            "code": 1482
                        }
                    ]
                },
                {
                    "name": "阜阳市",
                    "code": 234,
                    "sub": [
                        {
                            "name": "颍州区",
                            "code": 1483
                        },
                        {
                            "name": "颍东区",
                            "code": 1484
                        },
                        {
                            "name": "颍泉区",
                            "code": 1485
                        },
                        {
                            "name": "临泉县",
                            "code": 1486
                        },
                        {
                            "name": "太和县",
                            "code": 1487
                        },
                        {
                            "name": "阜南县",
                            "code": 1488
                        },
                        {
                            "name": "颍上县",
                            "code": 1489
                        },
                        {
                            "name": "界首市",
                            "code": 1490
                        }
                    ]
                },
                {
                    "name": "宿州市",
                    "code": 235,
                    "sub": [
                        {
                            "name": "埇桥区",
                            "code": 1491
                        },
                        {
                            "name": "砀山县",
                            "code": 1492
                        },
                        {
                            "name": "萧县",
                            "code": 1493
                        },
                        {
                            "name": "灵璧县",
                            "code": 1494
                        },
                        {
                            "name": "泗县",
                            "code": 1495
                        }
                    ]
                },
                {
                    "name": "巢湖市",
                    "code": 236,
                    "sub": [
                        {
                            "name": "居巢区",
                            "code": 1496
                        },
                        {
                            "name": "庐江县",
                            "code": 1497
                        },
                        {
                            "name": "无为县",
                            "code": 1498
                        },
                        {
                            "name": "含山县",
                            "code": 1499
                        },
                        {
                            "name": "和县",
                            "code": 1500
                        }
                    ]
                },
                {
                    "name": "六安市",
                    "code": 237,
                    "sub": [
                        {
                            "name": "金安区",
                            "code": 1501
                        },
                        {
                            "name": "裕安区",
                            "code": 1502
                        },
                        {
                            "name": "寿县",
                            "code": 1503
                        },
                        {
                            "name": "霍邱县",
                            "code": 1504
                        },
                        {
                            "name": "舒城县",
                            "code": 1505
                        },
                        {
                            "name": "金寨县",
                            "code": 1506
                        },
                        {
                            "name": "霍山县",
                            "code": 1507
                        }
                    ]
                },
                {
                    "name": "亳州市",
                    "code": 238,
                    "sub": [
                        {
                            "name": "谯城区",
                            "code": 1508
                        },
                        {
                            "name": "涡阳县",
                            "code": 1509
                        },
                        {
                            "name": "蒙城县",
                            "code": 1510
                        },
                        {
                            "name": "利辛县",
                            "code": 1511
                        }
                    ]
                },
                {
                    "name": "池州市",
                    "code": 239,
                    "sub": [
                        {
                            "name": "贵池区",
                            "code": 1512
                        },
                        {
                            "name": "东至县",
                            "code": 1513
                        },
                        {
                            "name": "石台县",
                            "code": 1514
                        },
                        {
                            "name": "青阳县",
                            "code": 1515
                        }
                    ]
                },
                {
                    "name": "宣城市",
                    "code": 240,
                    "sub": [
                        {
                            "name": "宣州区",
                            "code": 1516
                        },
                        {
                            "name": "郎溪县",
                            "code": 1517
                        },
                        {
                            "name": "广德县",
                            "code": 1518
                        },
                        {
                            "name": "泾县",
                            "code": 1519
                        },
                        {
                            "name": "绩溪县",
                            "code": 1520
                        },
                        {
                            "name": "旌德县",
                            "code": 1521
                        },
                        {
                            "name": "宁国市",
                            "code": 1522
                        }
                    ]
                }
            ]
        },
        {
            "name": "福建省",
            "code": 15,
            "sub": [
                {
                    "name": "福州市",
                    "code": 241,
                    "sub": [
                        {
                            "name": "鼓楼区",
                            "code": 1523
                        },
                        {
                            "name": "台江区",
                            "code": 1524
                        },
                        {
                            "name": "仓山区",
                            "code": 1525
                        },
                        {
                            "name": "马尾区",
                            "code": 1526
                        },
                        {
                            "name": "晋安区",
                            "code": 1527
                        },
                        {
                            "name": "闽侯县",
                            "code": 1528
                        },
                        {
                            "name": "连江县",
                            "code": 1529
                        },
                        {
                            "name": "罗源县",
                            "code": 1530
                        },
                        {
                            "name": "闽清县",
                            "code": 1531
                        },
                        {
                            "name": "永泰县",
                            "code": 1532
                        },
                        {
                            "name": "平潭县",
                            "code": 1533
                        },
                        {
                            "name": "福清市",
                            "code": 1534
                        },
                        {
                            "name": "长乐市",
                            "code": 1535
                        }
                    ]
                },
                {
                    "name": "厦门市",
                    "code": 242,
                    "sub": [
                        {
                            "name": "思明区",
                            "code": 1536
                        },
                        {
                            "name": "海沧区",
                            "code": 1537
                        },
                        {
                            "name": "湖里区",
                            "code": 1538
                        },
                        {
                            "name": "集美区",
                            "code": 1539
                        },
                        {
                            "name": "同安区",
                            "code": 1540
                        },
                        {
                            "name": "翔安区",
                            "code": 1541
                        }
                    ]
                },
                {
                    "name": "莆田市",
                    "code": 243,
                    "sub": [
                        {
                            "name": "城厢区",
                            "code": 1542
                        },
                        {
                            "name": "涵江区",
                            "code": 1543
                        },
                        {
                            "name": "荔城区",
                            "code": 1544
                        },
                        {
                            "name": "秀屿区",
                            "code": 1545
                        },
                        {
                            "name": "仙游县",
                            "code": 1546
                        }
                    ]
                },
                {
                    "name": "三明市",
                    "code": 244,
                    "sub": [
                        {
                            "name": "梅列区",
                            "code": 1547
                        },
                        {
                            "name": "三元区",
                            "code": 1548
                        },
                        {
                            "name": "明溪县",
                            "code": 1549
                        },
                        {
                            "name": "清流县",
                            "code": 1550
                        },
                        {
                            "name": "宁化县",
                            "code": 1551
                        },
                        {
                            "name": "大田县",
                            "code": 1552
                        },
                        {
                            "name": "尤溪县",
                            "code": 1553
                        },
                        {
                            "name": "沙县",
                            "code": 1554
                        },
                        {
                            "name": "将乐县",
                            "code": 1555
                        },
                        {
                            "name": "泰宁县",
                            "code": 1556
                        },
                        {
                            "name": "建宁县",
                            "code": 1557
                        },
                        {
                            "name": "永安市",
                            "code": 1558
                        }
                    ]
                },
                {
                    "name": "泉州市",
                    "code": 245,
                    "sub": [
                        {
                            "name": "鲤城区",
                            "code": 1559
                        },
                        {
                            "name": "丰泽区",
                            "code": 1560
                        },
                        {
                            "name": "洛江区",
                            "code": 1561
                        },
                        {
                            "name": "泉港区",
                            "code": 1562
                        },
                        {
                            "name": "惠安县",
                            "code": 1563
                        },
                        {
                            "name": "安溪县",
                            "code": 1564
                        },
                        {
                            "name": "永春县",
                            "code": 1565
                        },
                        {
                            "name": "德化县",
                            "code": 1566
                        },
                        {
                            "name": "金门县",
                            "code": 1567
                        },
                        {
                            "name": "石狮市",
                            "code": 1568
                        },
                        {
                            "name": "晋江市",
                            "code": 1569
                        },
                        {
                            "name": "南安市",
                            "code": 1570
                        }
                    ]
                },
                {
                    "name": "漳州市",
                    "code": 246,
                    "sub": [
                        {
                            "name": "芗城区",
                            "code": 1571
                        },
                        {
                            "name": "龙文区",
                            "code": 1572
                        },
                        {
                            "name": "云霄县",
                            "code": 1573
                        },
                        {
                            "name": "漳浦县",
                            "code": 1574
                        },
                        {
                            "name": "诏安县",
                            "code": 1575
                        },
                        {
                            "name": "长泰县",
                            "code": 1576
                        },
                        {
                            "name": "东山县",
                            "code": 1577
                        },
                        {
                            "name": "南靖县",
                            "code": 1578
                        },
                        {
                            "name": "平和县",
                            "code": 1579
                        },
                        {
                            "name": "华安县",
                            "code": 1580
                        },
                        {
                            "name": "龙海市",
                            "code": 1581
                        }
                    ]
                },
                {
                    "name": "南平市",
                    "code": 247,
                    "sub": [
                        {
                            "name": "延平区",
                            "code": 1582
                        },
                        {
                            "name": "顺昌县",
                            "code": 1583
                        },
                        {
                            "name": "浦城县",
                            "code": 1584
                        },
                        {
                            "name": "光泽县",
                            "code": 1585
                        },
                        {
                            "name": "松溪县",
                            "code": 1586
                        },
                        {
                            "name": "政和县",
                            "code": 1587
                        },
                        {
                            "name": "邵武市",
                            "code": 1588
                        },
                        {
                            "name": "武夷山市",
                            "code": 1589
                        },
                        {
                            "name": "建瓯市",
                            "code": 1590
                        },
                        {
                            "name": "建阳市",
                            "code": 1591
                        }
                    ]
                },
                {
                    "name": "龙岩市",
                    "code": 248,
                    "sub": [
                        {
                            "name": "新罗区",
                            "code": 1592
                        },
                        {
                            "name": "长汀县",
                            "code": 1593
                        },
                        {
                            "name": "永定县",
                            "code": 1594
                        },
                        {
                            "name": "上杭县",
                            "code": 1595
                        },
                        {
                            "name": "武平县",
                            "code": 1596
                        },
                        {
                            "name": "连城县",
                            "code": 1597
                        },
                        {
                            "name": "漳平市",
                            "code": 1598
                        }
                    ]
                },
                {
                    "name": "宁德市",
                    "code": 249,
                    "sub": [
                        {
                            "name": "蕉城区",
                            "code": 1599
                        },
                        {
                            "name": "霞浦县",
                            "code": 1600
                        },
                        {
                            "name": "古田县",
                            "code": 1601
                        },
                        {
                            "name": "屏南县",
                            "code": 1602
                        },
                        {
                            "name": "寿宁县",
                            "code": 1603
                        },
                        {
                            "name": "周宁县",
                            "code": 1604
                        },
                        {
                            "name": "柘荣县",
                            "code": 1605
                        },
                        {
                            "name": "福安市",
                            "code": 1606
                        },
                        {
                            "name": "福鼎市",
                            "code": 1607
                        }
                    ]
                }
            ]
        },
        {
            "name": "江西省",
            "code": 16,
            "sub": [
                {
                    "name": "南昌市",
                    "code": 250,
                    "sub": [
                        {
                            "name": "东湖区",
                            "code": 1608
                        },
                        {
                            "name": "西湖区",
                            "code": 1609
                        },
                        {
                            "name": "青云谱区",
                            "code": 1610
                        },
                        {
                            "name": "湾里区",
                            "code": 1611
                        },
                        {
                            "name": "青山湖区",
                            "code": 1612
                        },
                        {
                            "name": "南昌县",
                            "code": 1613
                        },
                        {
                            "name": "新建县",
                            "code": 1614
                        },
                        {
                            "name": "安义县",
                            "code": 1615
                        },
                        {
                            "name": "进贤县",
                            "code": 1616
                        }
                    ]
                },
                {
                    "name": "景德镇市",
                    "code": 251,
                    "sub": [
                        {
                            "name": "昌江区",
                            "code": 1617
                        },
                        {
                            "name": "珠山区",
                            "code": 1618
                        },
                        {
                            "name": "浮梁县",
                            "code": 1619
                        },
                        {
                            "name": "乐平市",
                            "code": 1620
                        }
                    ]
                },
                {
                    "name": "萍乡市",
                    "code": 252,
                    "sub": [
                        {
                            "name": "安源区",
                            "code": 1621
                        },
                        {
                            "name": "湘东区",
                            "code": 1622
                        },
                        {
                            "name": "莲花县",
                            "code": 1623
                        },
                        {
                            "name": "上栗县",
                            "code": 1624
                        },
                        {
                            "name": "芦溪县",
                            "code": 1625
                        }
                    ]
                },
                {
                    "name": "九江市",
                    "code": 253,
                    "sub": [
                        {
                            "name": "庐山区",
                            "code": 1626
                        },
                        {
                            "name": "浔阳区",
                            "code": 1627
                        },
                        {
                            "name": "九江县",
                            "code": 1628
                        },
                        {
                            "name": "武宁县",
                            "code": 1629
                        },
                        {
                            "name": "修水县",
                            "code": 1630
                        },
                        {
                            "name": "永修县",
                            "code": 1631
                        },
                        {
                            "name": "德安县",
                            "code": 1632
                        },
                        {
                            "name": "星子县",
                            "code": 1633
                        },
                        {
                            "name": "都昌县",
                            "code": 1634
                        },
                        {
                            "name": "湖口县",
                            "code": 1635
                        },
                        {
                            "name": "彭泽县",
                            "code": 1636
                        },
                        {
                            "name": "瑞昌市",
                            "code": 1637
                        }
                    ]
                },
                {
                    "name": "新余市",
                    "code": 254,
                    "sub": [
                        {
                            "name": "渝水区",
                            "code": 1638
                        },
                        {
                            "name": "分宜县",
                            "code": 1639
                        }
                    ]
                },
                {
                    "name": "鹰潭市",
                    "code": 255,
                    "sub": [
                        {
                            "name": "月湖区",
                            "code": 1640
                        },
                        {
                            "name": "余江县",
                            "code": 1641
                        },
                        {
                            "name": "贵溪市",
                            "code": 1642
                        }
                    ]
                },
                {
                    "name": "赣州市",
                    "code": 256,
                    "sub": [
                        {
                            "name": "章贡区",
                            "code": 1643
                        },
                        {
                            "name": "赣县",
                            "code": 1644
                        },
                        {
                            "name": "信丰县",
                            "code": 1645
                        },
                        {
                            "name": "大余县",
                            "code": 1646
                        },
                        {
                            "name": "上犹县",
                            "code": 1647
                        },
                        {
                            "name": "崇义县",
                            "code": 1648
                        },
                        {
                            "name": "安远县",
                            "code": 1649
                        },
                        {
                            "name": "龙南县",
                            "code": 1650
                        },
                        {
                            "name": "定南县",
                            "code": 1651
                        },
                        {
                            "name": "全南县",
                            "code": 1652
                        },
                        {
                            "name": "宁都县",
                            "code": 1653
                        },
                        {
                            "name": "于都县",
                            "code": 1654
                        },
                        {
                            "name": "兴国县",
                            "code": 1655
                        },
                        {
                            "name": "会昌县",
                            "code": 1656
                        },
                        {
                            "name": "寻乌县",
                            "code": 1657
                        },
                        {
                            "name": "石城县",
                            "code": 1658
                        },
                        {
                            "name": "瑞金市",
                            "code": 1659
                        },
                        {
                            "name": "南康市",
                            "code": 1660
                        }
                    ]
                },
                {
                    "name": "吉安市",
                    "code": 257,
                    "sub": [
                        {
                            "name": "吉州区",
                            "code": 1661
                        },
                        {
                            "name": "青原区",
                            "code": 1662
                        },
                        {
                            "name": "吉安县",
                            "code": 1663
                        },
                        {
                            "name": "吉水县",
                            "code": 1664
                        },
                        {
                            "name": "峡江县",
                            "code": 1665
                        },
                        {
                            "name": "新干县",
                            "code": 1666
                        },
                        {
                            "name": "永丰县",
                            "code": 1667
                        },
                        {
                            "name": "泰和县",
                            "code": 1668
                        },
                        {
                            "name": "遂川县",
                            "code": 1669
                        },
                        {
                            "name": "万安县",
                            "code": 1670
                        },
                        {
                            "name": "安福县",
                            "code": 1671
                        },
                        {
                            "name": "永新县",
                            "code": 1672
                        },
                        {
                            "name": "井冈山市",
                            "code": 1673
                        }
                    ]
                },
                {
                    "name": "宜春市",
                    "code": 258,
                    "sub": [
                        {
                            "name": "袁州区",
                            "code": 1674
                        },
                        {
                            "name": "奉新县",
                            "code": 1675
                        },
                        {
                            "name": "万载县",
                            "code": 1676
                        },
                        {
                            "name": "上高县",
                            "code": 1677
                        },
                        {
                            "name": "宜丰县",
                            "code": 1678
                        },
                        {
                            "name": "靖安县",
                            "code": 1679
                        },
                        {
                            "name": "铜鼓县",
                            "code": 1680
                        },
                        {
                            "name": "丰城市",
                            "code": 1681
                        },
                        {
                            "name": "樟树市",
                            "code": 1682
                        },
                        {
                            "name": "高安市",
                            "code": 1683
                        }
                    ]
                },
                {
                    "name": "抚州市",
                    "code": 259,
                    "sub": [
                        {
                            "name": "临川区",
                            "code": 1684
                        },
                        {
                            "name": "南城县",
                            "code": 1685
                        },
                        {
                            "name": "黎川县",
                            "code": 1686
                        },
                        {
                            "name": "南丰县",
                            "code": 1687
                        },
                        {
                            "name": "崇仁县",
                            "code": 1688
                        },
                        {
                            "name": "乐安县",
                            "code": 1689
                        },
                        {
                            "name": "宜黄县",
                            "code": 1690
                        },
                        {
                            "name": "金溪县",
                            "code": 1691
                        },
                        {
                            "name": "资溪县",
                            "code": 1692
                        },
                        {
                            "name": "东乡县",
                            "code": 1693
                        },
                        {
                            "name": "广昌县",
                            "code": 1694
                        }
                    ]
                },
                {
                    "name": "上饶市",
                    "code": 260,
                    "sub": [
                        {
                            "name": "信州区",
                            "code": 1695
                        },
                        {
                            "name": "上饶县",
                            "code": 1696
                        },
                        {
                            "name": "广丰县",
                            "code": 1697
                        },
                        {
                            "name": "玉山县",
                            "code": 1698
                        },
                        {
                            "name": "铅山县",
                            "code": 1699
                        },
                        {
                            "name": "横峰县",
                            "code": 1700
                        },
                        {
                            "name": "弋阳县",
                            "code": 1701
                        },
                        {
                            "name": "余干县",
                            "code": 1702
                        },
                        {
                            "name": "鄱阳县",
                            "code": 1703
                        },
                        {
                            "name": "万年县",
                            "code": 1704
                        },
                        {
                            "name": "婺源县",
                            "code": 1705
                        },
                        {
                            "name": "德兴市",
                            "code": 1706
                        }
                    ]
                }
            ]
        },
        {
            "name": "山东省",
            "code": 17,
            "sub": [
                {
                    "name": "济南市",
                    "code": 261,
                    "sub": [
                        {
                            "name": "历下区",
                            "code": 1707
                        },
                        {
                            "name": "市中区",
                            "code": 1708
                        },
                        {
                            "name": "槐荫区",
                            "code": 1709
                        },
                        {
                            "name": "天桥区",
                            "code": 1710
                        },
                        {
                            "name": "历城区",
                            "code": 1711
                        },
                        {
                            "name": "长清区",
                            "code": 1712
                        },
                        {
                            "name": "平阴县",
                            "code": 1713
                        },
                        {
                            "name": "济阳县",
                            "code": 1714
                        },
                        {
                            "name": "商河县",
                            "code": 1715
                        },
                        {
                            "name": "章丘市",
                            "code": 1716
                        }
                    ]
                },
                {
                    "name": "青岛市",
                    "code": 262,
                    "sub": [
                        {
                            "name": "市南区",
                            "code": 1717
                        },
                        {
                            "name": "市北区",
                            "code": 1718
                        },
                        {
                            "name": "四方区",
                            "code": 1719
                        },
                        {
                            "name": "黄岛区",
                            "code": 1720
                        },
                        {
                            "name": "崂山区",
                            "code": 1721
                        },
                        {
                            "name": "李沧区",
                            "code": 1722
                        },
                        {
                            "name": "城阳区",
                            "code": 1723
                        },
                        {
                            "name": "胶州市",
                            "code": 1724
                        },
                        {
                            "name": "即墨市",
                            "code": 1725
                        },
                        {
                            "name": "平度市",
                            "code": 1726
                        },
                        {
                            "name": "胶南市",
                            "code": 1727
                        },
                        {
                            "name": "莱西市",
                            "code": 1728
                        }
                    ]
                },
                {
                    "name": "淄博市",
                    "code": 263,
                    "sub": [
                        {
                            "name": "淄川区",
                            "code": 1729
                        },
                        {
                            "name": "张店区",
                            "code": 1730
                        },
                        {
                            "name": "博山区",
                            "code": 1731
                        },
                        {
                            "name": "临淄区",
                            "code": 1732
                        },
                        {
                            "name": "周村区",
                            "code": 1733
                        },
                        {
                            "name": "桓台县",
                            "code": 1734
                        },
                        {
                            "name": "高青县",
                            "code": 1735
                        },
                        {
                            "name": "沂源县",
                            "code": 1736
                        }
                    ]
                },
                {
                    "name": "枣庄市",
                    "code": 264,
                    "sub": [
                        {
                            "name": "市中区",
                            "code": 1737
                        },
                        {
                            "name": "薛城区",
                            "code": 1738
                        },
                        {
                            "name": "峄城区",
                            "code": 1739
                        },
                        {
                            "name": "台儿庄区",
                            "code": 1740
                        },
                        {
                            "name": "山亭区",
                            "code": 1741
                        },
                        {
                            "name": "滕州市",
                            "code": 1742
                        }
                    ]
                },
                {
                    "name": "东营市",
                    "code": 265,
                    "sub": [
                        {
                            "name": "东营区",
                            "code": 1743
                        },
                        {
                            "name": "河口区",
                            "code": 1744
                        },
                        {
                            "name": "垦利县",
                            "code": 1745
                        },
                        {
                            "name": "利津县",
                            "code": 1746
                        },
                        {
                            "name": "广饶县",
                            "code": 1747
                        }
                    ]
                },
                {
                    "name": "烟台市",
                    "code": 266,
                    "sub": [
                        {
                            "name": "芝罘区",
                            "code": 1748
                        },
                        {
                            "name": "福山区",
                            "code": 1749
                        },
                        {
                            "name": "牟平区",
                            "code": 1750
                        },
                        {
                            "name": "莱山区",
                            "code": 1751
                        },
                        {
                            "name": "长岛县",
                            "code": 1752
                        },
                        {
                            "name": "龙口市",
                            "code": 1753
                        },
                        {
                            "name": "莱阳市",
                            "code": 1754
                        },
                        {
                            "name": "莱州市",
                            "code": 1755
                        },
                        {
                            "name": "蓬莱市",
                            "code": 1756
                        },
                        {
                            "name": "招远市",
                            "code": 1757
                        },
                        {
                            "name": "栖霞市",
                            "code": 1758
                        },
                        {
                            "name": "海阳市",
                            "code": 1759
                        }
                    ]
                },
                {
                    "name": "潍坊市",
                    "code": 267,
                    "sub": [
                        {
                            "name": "潍城区",
                            "code": 1760
                        },
                        {
                            "name": "寒亭区",
                            "code": 1761
                        },
                        {
                            "name": "坊子区",
                            "code": 1762
                        },
                        {
                            "name": "奎文区",
                            "code": 1763
                        },
                        {
                            "name": "临朐县",
                            "code": 1764
                        },
                        {
                            "name": "昌乐县",
                            "code": 1765
                        },
                        {
                            "name": "青州市",
                            "code": 1766
                        },
                        {
                            "name": "诸城市",
                            "code": 1767
                        },
                        {
                            "name": "寿光市",
                            "code": 1768
                        },
                        {
                            "name": "安丘市",
                            "code": 1769
                        },
                        {
                            "name": "高密市",
                            "code": 1770
                        },
                        {
                            "name": "昌邑市",
                            "code": 1771
                        }
                    ]
                },
                {
                    "name": "济宁市",
                    "code": 268,
                    "sub": [
                        {
                            "name": "市中区",
                            "code": 1772
                        },
                        {
                            "name": "任城区",
                            "code": 1773
                        },
                        {
                            "name": "微山县",
                            "code": 1774
                        },
                        {
                            "name": "鱼台县",
                            "code": 1775
                        },
                        {
                            "name": "金乡县",
                            "code": 1776
                        },
                        {
                            "name": "嘉祥县",
                            "code": 1777
                        },
                        {
                            "name": "汶上县",
                            "code": 1778
                        },
                        {
                            "name": "泗水县",
                            "code": 1779
                        },
                        {
                            "name": "梁山县",
                            "code": 1780
                        },
                        {
                            "name": "曲阜市",
                            "code": 1781
                        },
                        {
                            "name": "兖州市",
                            "code": 1782
                        },
                        {
                            "name": "邹城市",
                            "code": 1783
                        }
                    ]
                },
                {
                    "name": "泰安市",
                    "code": 269,
                    "sub": [
                        {
                            "name": "泰山区",
                            "code": 1784
                        },
                        {
                            "name": "岱岳区",
                            "code": 1785
                        },
                        {
                            "name": "宁阳县",
                            "code": 1786
                        },
                        {
                            "name": "东平县",
                            "code": 1787
                        },
                        {
                            "name": "新泰市",
                            "code": 1788
                        },
                        {
                            "name": "肥城市",
                            "code": 1789
                        }
                    ]
                },
                {
                    "name": "威海市",
                    "code": 270,
                    "sub": [
                        {
                            "name": "环翠区",
                            "code": 1790
                        },
                        {
                            "name": "文登市",
                            "code": 1791
                        },
                        {
                            "name": "荣成市",
                            "code": 1792
                        },
                        {
                            "name": "乳山市",
                            "code": 1793
                        }
                    ]
                },
                {
                    "name": "日照市",
                    "code": 271,
                    "sub": [
                        {
                            "name": "东港区",
                            "code": 1794
                        },
                        {
                            "name": "岚山区",
                            "code": 1795
                        },
                        {
                            "name": "五莲县",
                            "code": 1796
                        },
                        {
                            "name": "莒县",
                            "code": 1797
                        }
                    ]
                },
                {
                    "name": "莱芜市",
                    "code": 272,
                    "sub": [
                        {
                            "name": "莱城区",
                            "code": 1798
                        },
                        {
                            "name": "钢城区",
                            "code": 1799
                        }
                    ]
                },
                {
                    "name": "临沂市",
                    "code": 273,
                    "sub": [
                        {
                            "name": "兰山区",
                            "code": 1800
                        },
                        {
                            "name": "罗庄区",
                            "code": 1801
                        },
                        {
                            "name": "河东区",
                            "code": 1802
                        },
                        {
                            "name": "沂南县",
                            "code": 1803
                        },
                        {
                            "name": "郯城县",
                            "code": 1804
                        },
                        {
                            "name": "沂水县",
                            "code": 1805
                        },
                        {
                            "name": "苍山县",
                            "code": 1806
                        },
                        {
                            "name": "费县",
                            "code": 1807
                        },
                        {
                            "name": "平邑县",
                            "code": 1808
                        },
                        {
                            "name": "莒南县",
                            "code": 1809
                        },
                        {
                            "name": "蒙阴县",
                            "code": 1810
                        },
                        {
                            "name": "临沭县",
                            "code": 1811
                        }
                    ]
                },
                {
                    "name": "德州市",
                    "code": 274,
                    "sub": [
                        {
                            "name": "德城区",
                            "code": 1812
                        },
                        {
                            "name": "陵县",
                            "code": 1813
                        },
                        {
                            "name": "宁津县",
                            "code": 1814
                        },
                        {
                            "name": "庆云县",
                            "code": 1815
                        },
                        {
                            "name": "临邑县",
                            "code": 1816
                        },
                        {
                            "name": "齐河县",
                            "code": 1817
                        },
                        {
                            "name": "平原县",
                            "code": 1818
                        },
                        {
                            "name": "夏津县",
                            "code": 1819
                        },
                        {
                            "name": "武城县",
                            "code": 1820
                        },
                        {
                            "name": "乐陵市",
                            "code": 1821
                        },
                        {
                            "name": "禹城市",
                            "code": 1822
                        }
                    ]
                },
                {
                    "name": "聊城市",
                    "code": 275,
                    "sub": [
                        {
                            "name": "东昌府区",
                            "code": 1823
                        },
                        {
                            "name": "阳谷县",
                            "code": 1824
                        },
                        {
                            "name": "莘县",
                            "code": 1825
                        },
                        {
                            "name": "茌平县",
                            "code": 1826
                        },
                        {
                            "name": "东阿县",
                            "code": 1827
                        },
                        {
                            "name": "冠县",
                            "code": 1828
                        },
                        {
                            "name": "高唐县",
                            "code": 1829
                        },
                        {
                            "name": "临清市",
                            "code": 1830
                        }
                    ]
                },
                {
                    "name": "滨州市",
                    "code": 276,
                    "sub": [
                        {
                            "name": "滨城区",
                            "code": 1831
                        },
                        {
                            "name": "惠民县",
                            "code": 1832
                        },
                        {
                            "name": "阳信县",
                            "code": 1833
                        },
                        {
                            "name": "无棣县",
                            "code": 1834
                        },
                        {
                            "name": "沾化县",
                            "code": 1835
                        },
                        {
                            "name": "博兴县",
                            "code": 1836
                        },
                        {
                            "name": "邹平县",
                            "code": 1837
                        }
                    ]
                },
                {
                    "name": "荷泽市",
                    "code": 277,
                    "sub": [
                        {
                            "name": "牡丹区",
                            "code": 1838
                        },
                        {
                            "name": "曹县",
                            "code": 1839
                        },
                        {
                            "name": "单县",
                            "code": 1840
                        },
                        {
                            "name": "成武县",
                            "code": 1841
                        },
                        {
                            "name": "巨野县",
                            "code": 1842
                        },
                        {
                            "name": "郓城县",
                            "code": 1843
                        },
                        {
                            "name": "鄄城县",
                            "code": 1844
                        },
                        {
                            "name": "定陶县",
                            "code": 1845
                        },
                        {
                            "name": "东明县",
                            "code": 1846
                        }
                    ]
                }
            ]
        },
        {
            "name": "河南省",
            "code": 18,
            "sub": [
                {
                    "name": "郑州市",
                    "code": 278,
                    "sub": [
                        {
                            "name": "中原区",
                            "code": 1847
                        },
                        {
                            "name": "二七区",
                            "code": 1848
                        },
                        {
                            "name": "管城回族区",
                            "code": 1849
                        },
                        {
                            "name": "金水区",
                            "code": 1850
                        },
                        {
                            "name": "上街区",
                            "code": 1851
                        },
                        {
                            "name": "惠济区",
                            "code": 1852
                        },
                        {
                            "name": "中牟县",
                            "code": 1853
                        },
                        {
                            "name": "巩义市",
                            "code": 1854
                        },
                        {
                            "name": "荥阳市",
                            "code": 1855
                        },
                        {
                            "name": "新密市",
                            "code": 1856
                        },
                        {
                            "name": "新郑市",
                            "code": 1857
                        },
                        {
                            "name": "登封市",
                            "code": 1858
                        }
                    ]
                },
                {
                    "name": "开封市",
                    "code": 279,
                    "sub": [
                        {
                            "name": "龙亭区",
                            "code": 1859
                        },
                        {
                            "name": "顺河回族区",
                            "code": 1860
                        },
                        {
                            "name": "鼓楼区",
                            "code": 1861
                        },
                        {
                            "name": "禹王台区",
                            "code": 1862
                        },
                        {
                            "name": "金明区",
                            "code": 1863
                        },
                        {
                            "name": "杞县",
                            "code": 1864
                        },
                        {
                            "name": "通许县",
                            "code": 1865
                        },
                        {
                            "name": "尉氏县",
                            "code": 1866
                        },
                        {
                            "name": "开封县",
                            "code": 1867
                        },
                        {
                            "name": "兰考县",
                            "code": 1868
                        }
                    ]
                },
                {
                    "name": "洛阳市",
                    "code": 280,
                    "sub": [
                        {
                            "name": "老城区",
                            "code": 1869
                        },
                        {
                            "name": "西工区",
                            "code": 1870
                        },
                        {
                            "name": "廛河回族区",
                            "code": 1871
                        },
                        {
                            "name": "涧西区",
                            "code": 1872
                        },
                        {
                            "name": "吉利区",
                            "code": 1873
                        },
                        {
                            "name": "洛龙区",
                            "code": 1874
                        },
                        {
                            "name": "孟津县",
                            "code": 1875
                        },
                        {
                            "name": "新安县",
                            "code": 1876
                        },
                        {
                            "name": "栾川县",
                            "code": 1877
                        },
                        {
                            "name": "嵩县",
                            "code": 1878
                        },
                        {
                            "name": "汝阳县",
                            "code": 1879
                        },
                        {
                            "name": "宜阳县",
                            "code": 1880
                        },
                        {
                            "name": "洛宁县",
                            "code": 1881
                        },
                        {
                            "name": "伊川县",
                            "code": 1882
                        },
                        {
                            "name": "偃师市",
                            "code": 1883
                        }
                    ]
                },
                {
                    "name": "平顶山市",
                    "code": 281,
                    "sub": [
                        {
                            "name": "新华区",
                            "code": 1884
                        },
                        {
                            "name": "卫东区",
                            "code": 1885
                        },
                        {
                            "name": "石龙区",
                            "code": 1886
                        },
                        {
                            "name": "湛河区",
                            "code": 1887
                        },
                        {
                            "name": "宝丰县",
                            "code": 1888
                        },
                        {
                            "name": "叶县",
                            "code": 1889
                        },
                        {
                            "name": "鲁山县",
                            "code": 1890
                        },
                        {
                            "name": "郏县",
                            "code": 1891
                        },
                        {
                            "name": "舞钢市",
                            "code": 1892
                        },
                        {
                            "name": "汝州市",
                            "code": 1893
                        }
                    ]
                },
                {
                    "name": "安阳市",
                    "code": 282,
                    "sub": [
                        {
                            "name": "文峰区",
                            "code": 1894
                        },
                        {
                            "name": "北关区",
                            "code": 1895
                        },
                        {
                            "name": "殷都区",
                            "code": 1896
                        },
                        {
                            "name": "龙安区",
                            "code": 1897
                        },
                        {
                            "name": "安阳县",
                            "code": 1898
                        },
                        {
                            "name": "汤阴县",
                            "code": 1899
                        },
                        {
                            "name": "滑县",
                            "code": 1900
                        },
                        {
                            "name": "内黄县",
                            "code": 1901
                        },
                        {
                            "name": "林州市",
                            "code": 1902
                        }
                    ]
                },
                {
                    "name": "鹤壁市",
                    "code": 283,
                    "sub": [
                        {
                            "name": "鹤山区",
                            "code": 1903
                        },
                        {
                            "name": "山城区",
                            "code": 1904
                        },
                        {
                            "name": "淇滨区",
                            "code": 1905
                        },
                        {
                            "name": "浚县",
                            "code": 1906
                        },
                        {
                            "name": "淇县",
                            "code": 1907
                        }
                    ]
                },
                {
                    "name": "新乡市",
                    "code": 284,
                    "sub": [
                        {
                            "name": "红旗区",
                            "code": 1908
                        },
                        {
                            "name": "卫滨区",
                            "code": 1909
                        },
                        {
                            "name": "凤泉区",
                            "code": 1910
                        },
                        {
                            "name": "牧野区",
                            "code": 1911
                        },
                        {
                            "name": "新乡县",
                            "code": 1912
                        },
                        {
                            "name": "获嘉县",
                            "code": 1913
                        },
                        {
                            "name": "原阳县",
                            "code": 1914
                        },
                        {
                            "name": "延津县",
                            "code": 1915
                        },
                        {
                            "name": "封丘县",
                            "code": 1916
                        },
                        {
                            "name": "长垣县",
                            "code": 1917
                        },
                        {
                            "name": "卫辉市",
                            "code": 1918
                        },
                        {
                            "name": "辉县市",
                            "code": 1919
                        }
                    ]
                },
                {
                    "name": "焦作市",
                    "code": 285,
                    "sub": [
                        {
                            "name": "解放区",
                            "code": 1920
                        },
                        {
                            "name": "中站区",
                            "code": 1921
                        },
                        {
                            "name": "马村区",
                            "code": 1922
                        },
                        {
                            "name": "山阳区",
                            "code": 1923
                        },
                        {
                            "name": "修武县",
                            "code": 1924
                        },
                        {
                            "name": "博爱县",
                            "code": 1925
                        },
                        {
                            "name": "武陟县",
                            "code": 1926
                        },
                        {
                            "name": "温县",
                            "code": 1927
                        },
                        {
                            "name": "济源市",
                            "code": 1928
                        },
                        {
                            "name": "沁阳市",
                            "code": 1929
                        },
                        {
                            "name": "孟州市",
                            "code": 1930
                        }
                    ]
                },
                {
                    "name": "濮阳市",
                    "code": 286,
                    "sub": [
                        {
                            "name": "华龙区",
                            "code": 1931
                        },
                        {
                            "name": "清丰县",
                            "code": 1932
                        },
                        {
                            "name": "南乐县",
                            "code": 1933
                        },
                        {
                            "name": "范县",
                            "code": 1934
                        },
                        {
                            "name": "台前县",
                            "code": 1935
                        },
                        {
                            "name": "濮阳县",
                            "code": 1936
                        }
                    ]
                },
                {
                    "name": "许昌市",
                    "code": 287,
                    "sub": [
                        {
                            "name": "魏都区",
                            "code": 1937
                        },
                        {
                            "name": "许昌县",
                            "code": 1938
                        },
                        {
                            "name": "鄢陵县",
                            "code": 1939
                        },
                        {
                            "name": "襄城县",
                            "code": 1940
                        },
                        {
                            "name": "禹州市",
                            "code": 1941
                        },
                        {
                            "name": "长葛市",
                            "code": 1942
                        }
                    ]
                },
                {
                    "name": "漯河市",
                    "code": 288,
                    "sub": [
                        {
                            "name": "源汇区",
                            "code": 1943
                        },
                        {
                            "name": "郾城区",
                            "code": 1944
                        },
                        {
                            "name": "召陵区",
                            "code": 1945
                        },
                        {
                            "name": "舞阳县",
                            "code": 1946
                        },
                        {
                            "name": "临颍县",
                            "code": 1947
                        }
                    ]
                },
                {
                    "name": "三门峡市",
                    "code": 289,
                    "sub": [
                        {
                            "name": "湖滨区",
                            "code": 1948
                        },
                        {
                            "name": "渑池县",
                            "code": 1949
                        },
                        {
                            "name": "陕县",
                            "code": 1950
                        },
                        {
                            "name": "卢氏县",
                            "code": 1951
                        },
                        {
                            "name": "义马市",
                            "code": 1952
                        },
                        {
                            "name": "灵宝市",
                            "code": 1953
                        }
                    ]
                },
                {
                    "name": "南阳市",
                    "code": 290,
                    "sub": [
                        {
                            "name": "宛城区",
                            "code": 1954
                        },
                        {
                            "name": "卧龙区",
                            "code": 1955
                        },
                        {
                            "name": "南召县",
                            "code": 1956
                        },
                        {
                            "name": "方城县",
                            "code": 1957
                        },
                        {
                            "name": "西峡县",
                            "code": 1958
                        },
                        {
                            "name": "镇平县",
                            "code": 1959
                        },
                        {
                            "name": "内乡县",
                            "code": 1960
                        },
                        {
                            "name": "淅川县",
                            "code": 1961
                        },
                        {
                            "name": "社旗县",
                            "code": 1962
                        },
                        {
                            "name": "唐河县",
                            "code": 1963
                        },
                        {
                            "name": "新野县",
                            "code": 1964
                        },
                        {
                            "name": "桐柏县",
                            "code": 1965
                        },
                        {
                            "name": "邓州市",
                            "code": 1966
                        }
                    ]
                },
                {
                    "name": "商丘市",
                    "code": 291,
                    "sub": [
                        {
                            "name": "梁园区",
                            "code": 1967
                        },
                        {
                            "name": "睢阳区",
                            "code": 1968
                        },
                        {
                            "name": "民权县",
                            "code": 1969
                        },
                        {
                            "name": "睢县",
                            "code": 1970
                        },
                        {
                            "name": "宁陵县",
                            "code": 1971
                        },
                        {
                            "name": "柘城县",
                            "code": 1972
                        },
                        {
                            "name": "虞城县",
                            "code": 1973
                        },
                        {
                            "name": "夏邑县",
                            "code": 1974
                        },
                        {
                            "name": "永城市",
                            "code": 1975
                        }
                    ]
                },
                {
                    "name": "信阳市",
                    "code": 292,
                    "sub": [
                        {
                            "name": "浉河区",
                            "code": 1976
                        },
                        {
                            "name": "平桥区",
                            "code": 1977
                        },
                        {
                            "name": "罗山县",
                            "code": 1978
                        },
                        {
                            "name": "光山县",
                            "code": 1979
                        },
                        {
                            "name": "新县",
                            "code": 1980
                        },
                        {
                            "name": "商城县",
                            "code": 1981
                        },
                        {
                            "name": "固始县",
                            "code": 1982
                        },
                        {
                            "name": "潢川县",
                            "code": 1983
                        },
                        {
                            "name": "淮滨县",
                            "code": 1984
                        },
                        {
                            "name": "息县",
                            "code": 1985
                        }
                    ]
                },
                {
                    "name": "周口市",
                    "code": 293,
                    "sub": [
                        {
                            "name": "川汇区",
                            "code": 1986
                        },
                        {
                            "name": "扶沟县",
                            "code": 1987
                        },
                        {
                            "name": "西华县",
                            "code": 1988
                        },
                        {
                            "name": "商水县",
                            "code": 1989
                        },
                        {
                            "name": "沈丘县",
                            "code": 1990
                        },
                        {
                            "name": "郸城县",
                            "code": 1991
                        },
                        {
                            "name": "淮阳县",
                            "code": 1992
                        },
                        {
                            "name": "太康县",
                            "code": 1993
                        },
                        {
                            "name": "鹿邑县",
                            "code": 1994
                        },
                        {
                            "name": "项城市",
                            "code": 1995
                        }
                    ]
                },
                {
                    "name": "驻马店市",
                    "code": 294,
                    "sub": [
                        {
                            "name": "驿城区",
                            "code": 1996
                        },
                        {
                            "name": "西平县",
                            "code": 1997
                        },
                        {
                            "name": "上蔡县",
                            "code": 1998
                        },
                        {
                            "name": "平舆县",
                            "code": 1999
                        },
                        {
                            "name": "正阳县",
                            "code": 2000
                        },
                        {
                            "name": "确山县",
                            "code": 2001
                        },
                        {
                            "name": "泌阳县",
                            "code": 2002
                        },
                        {
                            "name": "汝南县",
                            "code": 2003
                        },
                        {
                            "name": "遂平县",
                            "code": 2004
                        },
                        {
                            "name": "新蔡县",
                            "code": 2005
                        }
                    ]
                }
            ]
        },
        {
            "name": "湖北省",
            "code": 19,
            "sub": [
                {
                    "name": "武汉市",
                    "code": 295,
                    "sub": [
                        {
                            "name": "江岸区",
                            "code": 2006
                        },
                        {
                            "name": "江汉区",
                            "code": 2007
                        },
                        {
                            "name": "硚口区",
                            "code": 2008
                        },
                        {
                            "name": "汉阳区",
                            "code": 2009
                        },
                        {
                            "name": "武昌区",
                            "code": 2010
                        },
                        {
                            "name": "青山区",
                            "code": 2011
                        },
                        {
                            "name": "洪山区",
                            "code": 2012
                        },
                        {
                            "name": "东西湖区",
                            "code": 2013
                        },
                        {
                            "name": "汉南区",
                            "code": 2014
                        },
                        {
                            "name": "蔡甸区",
                            "code": 2015
                        },
                        {
                            "name": "江夏区",
                            "code": 2016
                        },
                        {
                            "name": "黄陂区",
                            "code": 2017
                        },
                        {
                            "name": "新洲区",
                            "code": 2018
                        }
                    ]
                },
                {
                    "name": "黄石市",
                    "code": 296,
                    "sub": [
                        {
                            "name": "黄石港区",
                            "code": 2019
                        },
                        {
                            "name": "西塞山区",
                            "code": 2020
                        },
                        {
                            "name": "下陆区",
                            "code": 2021
                        },
                        {
                            "name": "铁山区",
                            "code": 2022
                        },
                        {
                            "name": "阳新县",
                            "code": 2023
                        },
                        {
                            "name": "大冶市",
                            "code": 2024
                        }
                    ]
                },
                {
                    "name": "十堰市",
                    "code": 297,
                    "sub": [
                        {
                            "name": "茅箭区",
                            "code": 2025
                        },
                        {
                            "name": "张湾区",
                            "code": 2026
                        },
                        {
                            "name": "郧县",
                            "code": 2027
                        },
                        {
                            "name": "郧西县",
                            "code": 2028
                        },
                        {
                            "name": "竹山县",
                            "code": 2029
                        },
                        {
                            "name": "竹溪县",
                            "code": 2030
                        },
                        {
                            "name": "房县",
                            "code": 2031
                        },
                        {
                            "name": "丹江口市",
                            "code": 2032
                        }
                    ]
                },
                {
                    "name": "宜昌市",
                    "code": 298,
                    "sub": [
                        {
                            "name": "西陵区",
                            "code": 2033
                        },
                        {
                            "name": "伍家岗区",
                            "code": 2034
                        },
                        {
                            "name": "点军区",
                            "code": 2035
                        },
                        {
                            "name": "猇亭区",
                            "code": 2036
                        },
                        {
                            "name": "夷陵区",
                            "code": 2037
                        },
                        {
                            "name": "远安县",
                            "code": 2038
                        },
                        {
                            "name": "兴山县",
                            "code": 2039
                        },
                        {
                            "name": "秭归县",
                            "code": 2040
                        },
                        {
                            "name": "长阳土家族自治县",
                            "code": 2041
                        },
                        {
                            "name": "五峰土家族自治县",
                            "code": 2042
                        },
                        {
                            "name": "宜都市",
                            "code": 2043
                        },
                        {
                            "name": "当阳市",
                            "code": 2044
                        },
                        {
                            "name": "枝江市",
                            "code": 2045
                        }
                    ]
                },
                {
                    "name": "襄樊市",
                    "code": 299,
                    "sub": [
                        {
                            "name": "襄城区",
                            "code": 2046
                        },
                        {
                            "name": "樊城区",
                            "code": 2047
                        },
                        {
                            "name": "襄阳区",
                            "code": 2048
                        },
                        {
                            "name": "南漳县",
                            "code": 2049
                        },
                        {
                            "name": "谷城县",
                            "code": 2050
                        },
                        {
                            "name": "保康县",
                            "code": 2051
                        },
                        {
                            "name": "老河口市",
                            "code": 2052
                        },
                        {
                            "name": "枣阳市",
                            "code": 2053
                        },
                        {
                            "name": "宜城市",
                            "code": 2054
                        }
                    ]
                },
                {
                    "name": "鄂州市",
                    "code": 300,
                    "sub": [
                        {
                            "name": "梁子湖区",
                            "code": 2055
                        },
                        {
                            "name": "华容区",
                            "code": 2056
                        },
                        {
                            "name": "鄂城区",
                            "code": 2057
                        }
                    ]
                },
                {
                    "name": "荆门市",
                    "code": 301,
                    "sub": [
                        {
                            "name": "东宝区",
                            "code": 2058
                        },
                        {
                            "name": "掇刀区",
                            "code": 2059
                        },
                        {
                            "name": "京山县",
                            "code": 2060
                        },
                        {
                            "name": "沙洋县",
                            "code": 2061
                        },
                        {
                            "name": "钟祥市",
                            "code": 2062
                        }
                    ]
                },
                {
                    "name": "孝感市",
                    "code": 302,
                    "sub": [
                        {
                            "name": "孝南区",
                            "code": 2063
                        },
                        {
                            "name": "孝昌县",
                            "code": 2064
                        },
                        {
                            "name": "大悟县",
                            "code": 2065
                        },
                        {
                            "name": "云梦县",
                            "code": 2066
                        },
                        {
                            "name": "应城市",
                            "code": 2067
                        },
                        {
                            "name": "安陆市",
                            "code": 2068
                        },
                        {
                            "name": "汉川市",
                            "code": 2069
                        }
                    ]
                },
                {
                    "name": "荆州市",
                    "code": 303,
                    "sub": [
                        {
                            "name": "沙市区",
                            "code": 2070
                        },
                        {
                            "name": "荆州区",
                            "code": 2071
                        },
                        {
                            "name": "公安县",
                            "code": 2072
                        },
                        {
                            "name": "监利县",
                            "code": 2073
                        },
                        {
                            "name": "江陵县",
                            "code": 2074
                        },
                        {
                            "name": "石首市",
                            "code": 2075
                        },
                        {
                            "name": "洪湖市",
                            "code": 2076
                        },
                        {
                            "name": "松滋市",
                            "code": 2077
                        }
                    ]
                },
                {
                    "name": "黄冈市",
                    "code": 304,
                    "sub": [
                        {
                            "name": "黄州区",
                            "code": 2078
                        },
                        {
                            "name": "团风县",
                            "code": 2079
                        },
                        {
                            "name": "红安县",
                            "code": 2080
                        },
                        {
                            "name": "罗田县",
                            "code": 2081
                        },
                        {
                            "name": "英山县",
                            "code": 2082
                        },
                        {
                            "name": "浠水县",
                            "code": 2083
                        },
                        {
                            "name": "蕲春县",
                            "code": 2084
                        },
                        {
                            "name": "黄梅县",
                            "code": 2085
                        },
                        {
                            "name": "麻城市",
                            "code": 2086
                        },
                        {
                            "name": "武穴市",
                            "code": 2087
                        }
                    ]
                },
                {
                    "name": "咸宁市",
                    "code": 305,
                    "sub": [
                        {
                            "name": "咸安区",
                            "code": 2088
                        },
                        {
                            "name": "嘉鱼县",
                            "code": 2089
                        },
                        {
                            "name": "通城县",
                            "code": 2090
                        },
                        {
                            "name": "崇阳县",
                            "code": 2091
                        },
                        {
                            "name": "通山县",
                            "code": 2092
                        },
                        {
                            "name": "赤壁市",
                            "code": 2093
                        }
                    ]
                },
                {
                    "name": "随州市",
                    "code": 306,
                    "sub": [
                        {
                            "name": "曾都区",
                            "code": 2094
                        },
                        {
                            "name": "广水市",
                            "code": 2095
                        }
                    ]
                },
                {
                    "name": "恩施土家族苗族自治州",
                    "code": 307,
                    "sub": [
                        {
                            "name": "恩施市",
                            "code": 2096
                        },
                        {
                            "name": "利川市",
                            "code": 2097
                        },
                        {
                            "name": "建始县",
                            "code": 2098
                        },
                        {
                            "name": "巴东县",
                            "code": 2099
                        },
                        {
                            "name": "宣恩县",
                            "code": 2100
                        },
                        {
                            "name": "咸丰县",
                            "code": 2101
                        },
                        {
                            "name": "来凤县",
                            "code": 2102
                        },
                        {
                            "name": "鹤峰县",
                            "code": 2103
                        }
                    ]
                },
                {
                    "name": "仙桃市",
                    "code": 308
                },
                {
                    "name": "潜江市",
                    "code": 309
                },
                {
                    "name": "天门市",
                    "code": 310
                },
                {
                    "name": "神农架林区",
                    "code": 311
                }
            ]
        },
        {
            "name": "湖南省",
            "code": 20,
            "sub": [
                {
                    "name": "长沙市",
                    "code": 312,
                    "sub": [
                        {
                            "name": "芙蓉区",
                            "code": 2104
                        },
                        {
                            "name": "天心区",
                            "code": 2105
                        },
                        {
                            "name": "岳麓区",
                            "code": 2106
                        },
                        {
                            "name": "开福区",
                            "code": 2107
                        },
                        {
                            "name": "雨花区",
                            "code": 2108
                        },
                        {
                            "name": "长沙县",
                            "code": 2109
                        },
                        {
                            "name": "望城县",
                            "code": 2110
                        },
                        {
                            "name": "宁乡县",
                            "code": 2111
                        },
                        {
                            "name": "浏阳市",
                            "code": 2112
                        }
                    ]
                },
                {
                    "name": "株洲市",
                    "code": 313,
                    "sub": [
                        {
                            "name": "荷塘区",
                            "code": 2113
                        },
                        {
                            "name": "芦淞区",
                            "code": 2114
                        },
                        {
                            "name": "石峰区",
                            "code": 2115
                        },
                        {
                            "name": "天元区",
                            "code": 2116
                        },
                        {
                            "name": "株洲县",
                            "code": 2117
                        },
                        {
                            "name": "攸县",
                            "code": 2118
                        },
                        {
                            "name": "茶陵县",
                            "code": 2119
                        },
                        {
                            "name": "炎陵县",
                            "code": 2120
                        },
                        {
                            "name": "醴陵市",
                            "code": 2121
                        }
                    ]
                },
                {
                    "name": "湘潭市",
                    "code": 314,
                    "sub": [
                        {
                            "name": "雨湖区",
                            "code": 2122
                        },
                        {
                            "name": "岳塘区",
                            "code": 2123
                        },
                        {
                            "name": "湘潭县",
                            "code": 2124
                        },
                        {
                            "name": "湘乡市",
                            "code": 2125
                        },
                        {
                            "name": "韶山市",
                            "code": 2126
                        }
                    ]
                },
                {
                    "name": "衡阳市",
                    "code": 315,
                    "sub": [
                        {
                            "name": "珠晖区",
                            "code": 2127
                        },
                        {
                            "name": "雁峰区",
                            "code": 2128
                        },
                        {
                            "name": "石鼓区",
                            "code": 2129
                        },
                        {
                            "name": "蒸湘区",
                            "code": 2130
                        },
                        {
                            "name": "南岳区",
                            "code": 2131
                        },
                        {
                            "name": "衡阳县",
                            "code": 2132
                        },
                        {
                            "name": "衡南县",
                            "code": 2133
                        },
                        {
                            "name": "衡山县",
                            "code": 2134
                        },
                        {
                            "name": "衡东县",
                            "code": 2135
                        },
                        {
                            "name": "祁东县",
                            "code": 2136
                        },
                        {
                            "name": "耒阳市",
                            "code": 2137
                        },
                        {
                            "name": "常宁市",
                            "code": 2138
                        }
                    ]
                },
                {
                    "name": "邵阳市",
                    "code": 316,
                    "sub": [
                        {
                            "name": "双清区",
                            "code": 2139
                        },
                        {
                            "name": "大祥区",
                            "code": 2140
                        },
                        {
                            "name": "北塔区",
                            "code": 2141
                        },
                        {
                            "name": "邵东县",
                            "code": 2142
                        },
                        {
                            "name": "新邵县",
                            "code": 2143
                        },
                        {
                            "name": "邵阳县",
                            "code": 2144
                        },
                        {
                            "name": "隆回县",
                            "code": 2145
                        },
                        {
                            "name": "洞口县",
                            "code": 2146
                        },
                        {
                            "name": "绥宁县",
                            "code": 2147
                        },
                        {
                            "name": "新宁县",
                            "code": 2148
                        },
                        {
                            "name": "城步苗族自治县",
                            "code": 2149
                        },
                        {
                            "name": "武冈市",
                            "code": 2150
                        }
                    ]
                },
                {
                    "name": "岳阳市",
                    "code": 317,
                    "sub": [
                        {
                            "name": "岳阳楼区",
                            "code": 2151
                        },
                        {
                            "name": "云溪区",
                            "code": 2152
                        },
                        {
                            "name": "君山区",
                            "code": 2153
                        },
                        {
                            "name": "岳阳县",
                            "code": 2154
                        },
                        {
                            "name": "华容县",
                            "code": 2155
                        },
                        {
                            "name": "湘阴县",
                            "code": 2156
                        },
                        {
                            "name": "平江县",
                            "code": 2157
                        },
                        {
                            "name": "汨罗市",
                            "code": 2158
                        },
                        {
                            "name": "临湘市",
                            "code": 2159
                        }
                    ]
                },
                {
                    "name": "常德市",
                    "code": 318,
                    "sub": [
                        {
                            "name": "武陵区",
                            "code": 2160
                        },
                        {
                            "name": "鼎城区",
                            "code": 2161
                        },
                        {
                            "name": "安乡县",
                            "code": 2162
                        },
                        {
                            "name": "汉寿县",
                            "code": 2163
                        },
                        {
                            "name": "澧县",
                            "code": 2164
                        },
                        {
                            "name": "临澧县",
                            "code": 2165
                        },
                        {
                            "name": "桃源县",
                            "code": 2166
                        },
                        {
                            "name": "石门县",
                            "code": 2167
                        },
                        {
                            "name": "津市市",
                            "code": 2168
                        }
                    ]
                },
                {
                    "name": "张家界市",
                    "code": 319,
                    "sub": [
                        {
                            "name": "永定区",
                            "code": 2169
                        },
                        {
                            "name": "武陵源区",
                            "code": 2170
                        },
                        {
                            "name": "慈利县",
                            "code": 2171
                        },
                        {
                            "name": "桑植县",
                            "code": 2172
                        }
                    ]
                },
                {
                    "name": "益阳市",
                    "code": 320,
                    "sub": [
                        {
                            "name": "资阳区",
                            "code": 2173
                        },
                        {
                            "name": "赫山区",
                            "code": 2174
                        },
                        {
                            "name": "南县",
                            "code": 2175
                        },
                        {
                            "name": "桃江县",
                            "code": 2176
                        },
                        {
                            "name": "安化县",
                            "code": 2177
                        },
                        {
                            "name": "沅江市",
                            "code": 2178
                        }
                    ]
                },
                {
                    "name": "郴州市",
                    "code": 321,
                    "sub": [
                        {
                            "name": "北湖区",
                            "code": 2179
                        },
                        {
                            "name": "苏仙区",
                            "code": 2180
                        },
                        {
                            "name": "桂阳县",
                            "code": 2181
                        },
                        {
                            "name": "宜章县",
                            "code": 2182
                        },
                        {
                            "name": "永兴县",
                            "code": 2183
                        },
                        {
                            "name": "嘉禾县",
                            "code": 2184
                        },
                        {
                            "name": "临武县",
                            "code": 2185
                        },
                        {
                            "name": "汝城县",
                            "code": 2186
                        },
                        {
                            "name": "桂东县",
                            "code": 2187
                        },
                        {
                            "name": "安仁县",
                            "code": 2188
                        },
                        {
                            "name": "资兴市",
                            "code": 2189
                        }
                    ]
                },
                {
                    "name": "永州市",
                    "code": 322,
                    "sub": [
                        {
                            "name": "零陵区",
                            "code": 2190
                        },
                        {
                            "name": "冷水滩区",
                            "code": 2191
                        },
                        {
                            "name": "祁阳县",
                            "code": 2192
                        },
                        {
                            "name": "东安县",
                            "code": 2193
                        },
                        {
                            "name": "双牌县",
                            "code": 2194
                        },
                        {
                            "name": "道县",
                            "code": 2195
                        },
                        {
                            "name": "江永县",
                            "code": 2196
                        },
                        {
                            "name": "宁远县",
                            "code": 2197
                        },
                        {
                            "name": "蓝山县",
                            "code": 2198
                        },
                        {
                            "name": "新田县",
                            "code": 2199
                        },
                        {
                            "name": "江华瑶族自治县",
                            "code": 2200
                        }
                    ]
                },
                {
                    "name": "怀化市",
                    "code": 323,
                    "sub": [
                        {
                            "name": "鹤城区",
                            "code": 2201
                        },
                        {
                            "name": "中方县",
                            "code": 2202
                        },
                        {
                            "name": "沅陵县",
                            "code": 2203
                        },
                        {
                            "name": "辰溪县",
                            "code": 2204
                        },
                        {
                            "name": "溆浦县",
                            "code": 2205
                        },
                        {
                            "name": "会同县",
                            "code": 2206
                        },
                        {
                            "name": "麻阳苗族自治县",
                            "code": 2207
                        },
                        {
                            "name": "新晃侗族自治县",
                            "code": 2208
                        },
                        {
                            "name": "芷江侗族自治县",
                            "code": 2209
                        },
                        {
                            "name": "靖州苗族侗族自治县",
                            "code": 2210
                        },
                        {
                            "name": "通道侗族自治县",
                            "code": 2211
                        },
                        {
                            "name": "洪江市",
                            "code": 2212
                        }
                    ]
                },
                {
                    "name": "娄底市",
                    "code": 324,
                    "sub": [
                        {
                            "name": "娄星区",
                            "code": 2213
                        },
                        {
                            "name": "双峰县",
                            "code": 2214
                        },
                        {
                            "name": "新化县",
                            "code": 2215
                        },
                        {
                            "name": "冷水江市",
                            "code": 2216
                        },
                        {
                            "name": "涟源市",
                            "code": 2217
                        }
                    ]
                },
                {
                    "name": "湘西土家族苗族自治州",
                    "code": 325,
                    "sub": [
                        {
                            "name": "吉首市",
                            "code": 2218
                        },
                        {
                            "name": "泸溪县",
                            "code": 2219
                        },
                        {
                            "name": "凤凰县",
                            "code": 2220
                        },
                        {
                            "name": "花垣县",
                            "code": 2221
                        },
                        {
                            "name": "保靖县",
                            "code": 2222
                        },
                        {
                            "name": "古丈县",
                            "code": 2223
                        },
                        {
                            "name": "永顺县",
                            "code": 2224
                        },
                        {
                            "name": "龙山县",
                            "code": 2225
                        }
                    ]
                }
            ]
        },
        {
            "name": "广东省",
            "code": 21,
            "sub": [
                {
                    "name": "广州市",
                    "code": 326,
                    "sub": [
                        {
                            "name": "荔湾区",
                            "code": 2226
                        },
                        {
                            "name": "越秀区",
                            "code": 2227
                        },
                        {
                            "name": "海珠区",
                            "code": 2228
                        },
                        {
                            "name": "天河区",
                            "code": 2229
                        },
                        {
                            "name": "白云区",
                            "code": 2230
                        },
                        {
                            "name": "黄埔区",
                            "code": 2231
                        },
                        {
                            "name": "番禺区",
                            "code": 2232
                        },
                        {
                            "name": "花都区",
                            "code": 2233
                        },
                        {
                            "name": "南沙区",
                            "code": 2234
                        },
                        {
                            "name": "萝岗区",
                            "code": 2235
                        },
                        {
                            "name": "增城市",
                            "code": 2236
                        },
                        {
                            "name": "从化市",
                            "code": 2237
                        }
                    ]
                },
                {
                    "name": "韶关市",
                    "code": 327,
                    "sub": [
                        {
                            "name": "武江区",
                            "code": 2238
                        },
                        {
                            "name": "浈江区",
                            "code": 2239
                        },
                        {
                            "name": "曲江区",
                            "code": 2240
                        },
                        {
                            "name": "始兴县",
                            "code": 2241
                        },
                        {
                            "name": "仁化县",
                            "code": 2242
                        },
                        {
                            "name": "翁源县",
                            "code": 2243
                        },
                        {
                            "name": "乳源瑶族自治县",
                            "code": 2244
                        },
                        {
                            "name": "新丰县",
                            "code": 2245
                        },
                        {
                            "name": "乐昌市",
                            "code": 2246
                        },
                        {
                            "name": "南雄市",
                            "code": 2247
                        }
                    ]
                },
                {
                    "name": "深圳市",
                    "code": 328,
                    "sub": [
                        {
                            "name": "罗湖区",
                            "code": 2248
                        },
                        {
                            "name": "福田区",
                            "code": 2249
                        },
                        {
                            "name": "南山区",
                            "code": 2250
                        },
                        {
                            "name": "宝安区",
                            "code": 2251
                        },
                        {
                            "name": "龙岗区",
                            "code": 2252
                        },
                        {
                            "name": "盐田区",
                            "code": 2253
                        }
                    ]
                },
                {
                    "name": "珠海市",
                    "code": 329,
                    "sub": [
                        {
                            "name": "香洲区",
                            "code": 2254
                        },
                        {
                            "name": "斗门区",
                            "code": 2255
                        },
                        {
                            "name": "金湾区",
                            "code": 2256
                        }
                    ]
                },
                {
                    "name": "汕头市",
                    "code": 330,
                    "sub": [
                        {
                            "name": "龙湖区",
                            "code": 2257
                        },
                        {
                            "name": "金平区",
                            "code": 2258
                        },
                        {
                            "name": "濠江区",
                            "code": 2259
                        },
                        {
                            "name": "潮阳区",
                            "code": 2260
                        },
                        {
                            "name": "潮南区",
                            "code": 2261
                        },
                        {
                            "name": "澄海区",
                            "code": 2262
                        },
                        {
                            "name": "南澳县",
                            "code": 2263
                        }
                    ]
                },
                {
                    "name": "佛山市",
                    "code": 331,
                    "sub": [
                        {
                            "name": "禅城区",
                            "code": 2264
                        },
                        {
                            "name": "南海区",
                            "code": 2265
                        },
                        {
                            "name": "顺德区",
                            "code": 2266
                        },
                        {
                            "name": "三水区",
                            "code": 2267
                        },
                        {
                            "name": "高明区",
                            "code": 2268
                        }
                    ]
                },
                {
                    "name": "江门市",
                    "code": 332,
                    "sub": [
                        {
                            "name": "蓬江区",
                            "code": 2269
                        },
                        {
                            "name": "江海区",
                            "code": 2270
                        },
                        {
                            "name": "新会区",
                            "code": 2271
                        },
                        {
                            "name": "台山市",
                            "code": 2272
                        },
                        {
                            "name": "开平市",
                            "code": 2273
                        },
                        {
                            "name": "鹤山市",
                            "code": 2274
                        },
                        {
                            "name": "恩平市",
                            "code": 2275
                        }
                    ]
                },
                {
                    "name": "湛江市",
                    "code": 333,
                    "sub": [
                        {
                            "name": "赤坎区",
                            "code": 2276
                        },
                        {
                            "name": "霞山区",
                            "code": 2277
                        },
                        {
                            "name": "坡头区",
                            "code": 2278
                        },
                        {
                            "name": "麻章区",
                            "code": 2279
                        },
                        {
                            "name": "遂溪县",
                            "code": 2280
                        },
                        {
                            "name": "徐闻县",
                            "code": 2281
                        },
                        {
                            "name": "廉江市",
                            "code": 2282
                        },
                        {
                            "name": "雷州市",
                            "code": 2283
                        },
                        {
                            "name": "吴川市",
                            "code": 2284
                        }
                    ]
                },
                {
                    "name": "茂名市",
                    "code": 334,
                    "sub": [
                        {
                            "name": "茂南区",
                            "code": 2285
                        },
                        {
                            "name": "茂港区",
                            "code": 2286
                        },
                        {
                            "name": "电白县",
                            "code": 2287
                        },
                        {
                            "name": "高州市",
                            "code": 2288
                        },
                        {
                            "name": "化州市",
                            "code": 2289
                        },
                        {
                            "name": "信宜市",
                            "code": 2290
                        }
                    ]
                },
                {
                    "name": "肇庆市",
                    "code": 335,
                    "sub": [
                        {
                            "name": "端州区",
                            "code": 2291
                        },
                        {
                            "name": "鼎湖区",
                            "code": 2292
                        },
                        {
                            "name": "广宁县",
                            "code": 2293
                        },
                        {
                            "name": "怀集县",
                            "code": 2294
                        },
                        {
                            "name": "封开县",
                            "code": 2295
                        },
                        {
                            "name": "德庆县",
                            "code": 2296
                        },
                        {
                            "name": "高要市",
                            "code": 2297
                        },
                        {
                            "name": "四会市",
                            "code": 2298
                        }
                    ]
                },
                {
                    "name": "惠州市",
                    "code": 336,
                    "sub": [
                        {
                            "name": "惠城区",
                            "code": 2299
                        },
                        {
                            "name": "惠阳区",
                            "code": 2300
                        },
                        {
                            "name": "博罗县",
                            "code": 2301
                        },
                        {
                            "name": "惠东县",
                            "code": 2302
                        },
                        {
                            "name": "龙门县",
                            "code": 2303
                        }
                    ]
                },
                {
                    "name": "梅州市",
                    "code": 337,
                    "sub": [
                        {
                            "name": "梅江区",
                            "code": 2304
                        },
                        {
                            "name": "梅县",
                            "code": 2305
                        },
                        {
                            "name": "大埔县",
                            "code": 2306
                        },
                        {
                            "name": "丰顺县",
                            "code": 2307
                        },
                        {
                            "name": "五华县",
                            "code": 2308
                        },
                        {
                            "name": "平远县",
                            "code": 2309
                        },
                        {
                            "name": "蕉岭县",
                            "code": 2310
                        },
                        {
                            "name": "兴宁市",
                            "code": 2311
                        }
                    ]
                },
                {
                    "name": "汕尾市",
                    "code": 338,
                    "sub": [
                        {
                            "name": "城区",
                            "code": 2312
                        },
                        {
                            "name": "海丰县",
                            "code": 2313
                        },
                        {
                            "name": "陆河县",
                            "code": 2314
                        },
                        {
                            "name": "陆丰市",
                            "code": 2315
                        }
                    ]
                },
                {
                    "name": "河源市",
                    "code": 339,
                    "sub": [
                        {
                            "name": "源城区",
                            "code": 2316
                        },
                        {
                            "name": "紫金县",
                            "code": 2317
                        },
                        {
                            "name": "龙川县",
                            "code": 2318
                        },
                        {
                            "name": "连平县",
                            "code": 2319
                        },
                        {
                            "name": "和平县",
                            "code": 2320
                        },
                        {
                            "name": "东源县",
                            "code": 2321
                        }
                    ]
                },
                {
                    "name": "阳江市",
                    "code": 340,
                    "sub": [
                        {
                            "name": "江城区",
                            "code": 2322
                        },
                        {
                            "name": "阳西县",
                            "code": 2323
                        },
                        {
                            "name": "阳东县",
                            "code": 2324
                        },
                        {
                            "name": "阳春市",
                            "code": 2325
                        }
                    ]
                },
                {
                    "name": "清远市",
                    "code": 341,
                    "sub": [
                        {
                            "name": "清城区",
                            "code": 2326
                        },
                        {
                            "name": "佛冈县",
                            "code": 2327
                        },
                        {
                            "name": "阳山县",
                            "code": 2328
                        },
                        {
                            "name": "连山壮族瑶族自治县",
                            "code": 2329
                        },
                        {
                            "name": "连南瑶族自治县",
                            "code": 2330
                        },
                        {
                            "name": "清新县",
                            "code": 2331
                        },
                        {
                            "name": "英德市",
                            "code": 2332
                        },
                        {
                            "name": "连州市",
                            "code": 2333
                        }
                    ]
                },
                {
                    "name": "东莞市",
                    "code": 342
                },
                {
                    "name": "中山市",
                    "code": 343
                },
                {
                    "name": "潮州市",
                    "code": 344,
                    "sub": [
                        {
                            "name": "湘桥区",
                            "code": 2334
                        },
                        {
                            "name": "潮安县",
                            "code": 2335
                        },
                        {
                            "name": "饶平县",
                            "code": 2336
                        }
                    ]
                },
                {
                    "name": "揭阳市",
                    "code": 345,
                    "sub": [
                        {
                            "name": "榕城区",
                            "code": 2337
                        },
                        {
                            "name": "揭东县",
                            "code": 2338
                        },
                        {
                            "name": "揭西县",
                            "code": 2339
                        },
                        {
                            "name": "惠来县",
                            "code": 2340
                        },
                        {
                            "name": "普宁市",
                            "code": 2341
                        }
                    ]
                },
                {
                    "name": "云浮市",
                    "code": 346,
                    "sub": [
                        {
                            "name": "云城区",
                            "code": 2342
                        },
                        {
                            "name": "新兴县",
                            "code": 2343
                        },
                        {
                            "name": "郁南县",
                            "code": 2344
                        },
                        {
                            "name": "云安县",
                            "code": 2345
                        },
                        {
                            "name": "罗定市",
                            "code": 2346
                        }
                    ]
                }
            ]
        },
        {
            "name": "广西",
            "code": 22,
            "sub": [
                {
                    "name": "南宁市",
                    "code": 347,
                    "sub": [
                        {
                            "name": "兴宁区",
                            "code": 2347
                        },
                        {
                            "name": "青秀区",
                            "code": 2348
                        },
                        {
                            "name": "江南区",
                            "code": 2349
                        },
                        {
                            "name": "西乡塘区",
                            "code": 2350
                        },
                        {
                            "name": "良庆区",
                            "code": 2351
                        },
                        {
                            "name": "邕宁区",
                            "code": 2352
                        },
                        {
                            "name": "武鸣县",
                            "code": 2353
                        },
                        {
                            "name": "隆安县",
                            "code": 2354
                        },
                        {
                            "name": "马山县",
                            "code": 2355
                        },
                        {
                            "name": "上林县",
                            "code": 2356
                        },
                        {
                            "name": "宾阳县",
                            "code": 2357
                        },
                        {
                            "name": "横县",
                            "code": 2358
                        }
                    ]
                },
                {
                    "name": "柳州市",
                    "code": 348,
                    "sub": [
                        {
                            "name": "城中区",
                            "code": 2359
                        },
                        {
                            "name": "鱼峰区",
                            "code": 2360
                        },
                        {
                            "name": "柳南区",
                            "code": 2361
                        },
                        {
                            "name": "柳北区",
                            "code": 2362
                        },
                        {
                            "name": "柳江县",
                            "code": 2363
                        },
                        {
                            "name": "柳城县",
                            "code": 2364
                        },
                        {
                            "name": "鹿寨县",
                            "code": 2365
                        },
                        {
                            "name": "融安县",
                            "code": 2366
                        },
                        {
                            "name": "融水苗族自治县",
                            "code": 2367
                        },
                        {
                            "name": "三江侗族自治县",
                            "code": 2368
                        }
                    ]
                },
                {
                    "name": "桂林市",
                    "code": 349,
                    "sub": [
                        {
                            "name": "秀峰区",
                            "code": 2369
                        },
                        {
                            "name": "叠彩区",
                            "code": 2370
                        },
                        {
                            "name": "象山区",
                            "code": 2371
                        },
                        {
                            "name": "七星区",
                            "code": 2372
                        },
                        {
                            "name": "雁山区",
                            "code": 2373
                        },
                        {
                            "name": "阳朔县",
                            "code": 2374
                        },
                        {
                            "name": "临桂县",
                            "code": 2375
                        },
                        {
                            "name": "灵川县",
                            "code": 2376
                        },
                        {
                            "name": "全州县",
                            "code": 2377
                        },
                        {
                            "name": "兴安县",
                            "code": 2378
                        },
                        {
                            "name": "永福县",
                            "code": 2379
                        },
                        {
                            "name": "灌阳县",
                            "code": 2380
                        },
                        {
                            "name": "龙胜各族自治县",
                            "code": 2381
                        },
                        {
                            "name": "资源县",
                            "code": 2382
                        },
                        {
                            "name": "平乐县",
                            "code": 2383
                        },
                        {
                            "name": "荔蒲县",
                            "code": 2384
                        },
                        {
                            "name": "恭城瑶族自治县",
                            "code": 2385
                        }
                    ]
                },
                {
                    "name": "梧州市",
                    "code": 350,
                    "sub": [
                        {
                            "name": "万秀区",
                            "code": 2386
                        },
                        {
                            "name": "蝶山区",
                            "code": 2387
                        },
                        {
                            "name": "长洲区",
                            "code": 2388
                        },
                        {
                            "name": "苍梧县",
                            "code": 2389
                        },
                        {
                            "name": "藤县",
                            "code": 2390
                        },
                        {
                            "name": "蒙山县",
                            "code": 2391
                        },
                        {
                            "name": "岑溪市",
                            "code": 2392
                        }
                    ]
                },
                {
                    "name": "北海市",
                    "code": 351,
                    "sub": [
                        {
                            "name": "海城区",
                            "code": 2393
                        },
                        {
                            "name": "银海区",
                            "code": 2394
                        },
                        {
                            "name": "铁山港区",
                            "code": 2395
                        },
                        {
                            "name": "合浦县",
                            "code": 2396
                        }
                    ]
                },
                {
                    "name": "防城港市",
                    "code": 352,
                    "sub": [
                        {
                            "name": "港口区",
                            "code": 2397
                        },
                        {
                            "name": "防城区",
                            "code": 2398
                        },
                        {
                            "name": "上思县",
                            "code": 2399
                        },
                        {
                            "name": "东兴市",
                            "code": 2400
                        }
                    ]
                },
                {
                    "name": "钦州市",
                    "code": 353,
                    "sub": [
                        {
                            "name": "钦南区",
                            "code": 2401
                        },
                        {
                            "name": "钦北区",
                            "code": 2402
                        },
                        {
                            "name": "灵山县",
                            "code": 2403
                        },
                        {
                            "name": "浦北县",
                            "code": 2404
                        }
                    ]
                },
                {
                    "name": "贵港市",
                    "code": 354,
                    "sub": [
                        {
                            "name": "港北区",
                            "code": 2405
                        },
                        {
                            "name": "港南区",
                            "code": 2406
                        },
                        {
                            "name": "覃塘区",
                            "code": 2407
                        },
                        {
                            "name": "平南县",
                            "code": 2408
                        },
                        {
                            "name": "桂平市",
                            "code": 2409
                        }
                    ]
                },
                {
                    "name": "玉林市",
                    "code": 355,
                    "sub": [
                        {
                            "name": "玉州区",
                            "code": 2410
                        },
                        {
                            "name": "容县",
                            "code": 2411
                        },
                        {
                            "name": "陆川县",
                            "code": 2412
                        },
                        {
                            "name": "博白县",
                            "code": 2413
                        },
                        {
                            "name": "兴业县",
                            "code": 2414
                        },
                        {
                            "name": "北流市",
                            "code": 2415
                        }
                    ]
                },
                {
                    "name": "百色市",
                    "code": 356,
                    "sub": [
                        {
                            "name": "右江区",
                            "code": 2416
                        },
                        {
                            "name": "田阳县",
                            "code": 2417
                        },
                        {
                            "name": "田东县",
                            "code": 2418
                        },
                        {
                            "name": "平果县",
                            "code": 2419
                        },
                        {
                            "name": "德保县",
                            "code": 2420
                        },
                        {
                            "name": "靖西县",
                            "code": 2421
                        },
                        {
                            "name": "那坡县",
                            "code": 2422
                        },
                        {
                            "name": "凌云县",
                            "code": 2423
                        },
                        {
                            "name": "乐业县",
                            "code": 2424
                        },
                        {
                            "name": "田林县",
                            "code": 2425
                        },
                        {
                            "name": "西林县",
                            "code": 2426
                        },
                        {
                            "name": "隆林各族自治县",
                            "code": 2427
                        }
                    ]
                },
                {
                    "name": "贺州市",
                    "code": 357,
                    "sub": [
                        {
                            "name": "八步区",
                            "code": 2428
                        },
                        {
                            "name": "昭平县",
                            "code": 2429
                        },
                        {
                            "name": "钟山县",
                            "code": 2430
                        },
                        {
                            "name": "富川瑶族自治县",
                            "code": 2431
                        }
                    ]
                },
                {
                    "name": "河池市",
                    "code": 358,
                    "sub": [
                        {
                            "name": "金城江区",
                            "code": 2432
                        },
                        {
                            "name": "南丹县",
                            "code": 2433
                        },
                        {
                            "name": "天峨县",
                            "code": 2434
                        },
                        {
                            "name": "凤山县",
                            "code": 2435
                        },
                        {
                            "name": "东兰县",
                            "code": 2436
                        },
                        {
                            "name": "罗城仫佬族自治县",
                            "code": 2437
                        },
                        {
                            "name": "环江毛南族自治县",
                            "code": 2438
                        },
                        {
                            "name": "巴马瑶族自治县",
                            "code": 2439
                        },
                        {
                            "name": "都安瑶族自治县",
                            "code": 2440
                        },
                        {
                            "name": "大化瑶族自治县",
                            "code": 2441
                        },
                        {
                            "name": "宜州市",
                            "code": 2442
                        }
                    ]
                },
                {
                    "name": "来宾市",
                    "code": 359,
                    "sub": [
                        {
                            "name": "兴宾区",
                            "code": 2443
                        },
                        {
                            "name": "忻城县",
                            "code": 2444
                        },
                        {
                            "name": "象州县",
                            "code": 2445
                        },
                        {
                            "name": "武宣县",
                            "code": 2446
                        },
                        {
                            "name": "金秀瑶族自治县",
                            "code": 2447
                        },
                        {
                            "name": "合山市",
                            "code": 2448
                        }
                    ]
                },
                {
                    "name": "崇左市",
                    "code": 360,
                    "sub": [
                        {
                            "name": "江洲区",
                            "code": 2449
                        },
                        {
                            "name": "扶绥县",
                            "code": 2450
                        },
                        {
                            "name": "宁明县",
                            "code": 2451
                        },
                        {
                            "name": "龙州县",
                            "code": 2452
                        },
                        {
                            "name": "大新县",
                            "code": 2453
                        },
                        {
                            "name": "天等县",
                            "code": 2454
                        },
                        {
                            "name": "凭祥市",
                            "code": 2455
                        }
                    ]
                }
            ]
        },
        {
            "name": "海南省",
            "code": 23,
            "sub": [
                {
                    "name": "海口市",
                    "code": 361,
                    "sub": [
                        {
                            "name": "秀英区",
                            "code": 2456
                        },
                        {
                            "name": "龙华区",
                            "code": 2457
                        },
                        {
                            "name": "琼山区",
                            "code": 2458
                        },
                        {
                            "name": "美兰区",
                            "code": 2459
                        }
                    ]
                },
                {
                    "name": "三亚市",
                    "code": 362
                },
                {
                    "name": "五指山市",
                    "code": 363
                },
                {
                    "name": "琼海市",
                    "code": 364
                },
                {
                    "name": "儋州市",
                    "code": 365
                },
                {
                    "name": "文昌市",
                    "code": 366
                },
                {
                    "name": "万宁市",
                    "code": 367
                },
                {
                    "name": "东方市",
                    "code": 368
                },
                {
                    "name": "定安县",
                    "code": 369
                },
                {
                    "name": "屯昌县",
                    "code": 370
                },
                {
                    "name": "澄迈县",
                    "code": 371
                },
                {
                    "name": "临高县",
                    "code": 372
                },
                {
                    "name": "白沙黎族自治县",
                    "code": 373
                },
                {
                    "name": "昌江黎族自治县",
                    "code": 374
                },
                {
                    "name": "乐东黎族自治县",
                    "code": 375
                },
                {
                    "name": "陵水黎族自治县",
                    "code": 376
                },
                {
                    "name": "保亭黎族苗族自治县",
                    "code": 377
                },
                {
                    "name": "琼中黎族苗族自治县",
                    "code": 378
                },
                {
                    "name": "西沙群岛",
                    "code": 379
                },
                {
                    "name": "南沙群岛",
                    "code": 380
                },
                {
                    "name": "中沙群岛的岛礁及其海域",
                    "code": 381
                }
            ]
        },
        {
            "name": "四川省",
            "code": 24,
            "sub": [
                {
                    "name": "成都市",
                    "code": 382,
                    "sub": [
                        {
                            "name": "锦江区",
                            "code": 2460
                        },
                        {
                            "name": "青羊区",
                            "code": 2461
                        },
                        {
                            "name": "金牛区",
                            "code": 2462
                        },
                        {
                            "name": "武侯区",
                            "code": 2463
                        },
                        {
                            "name": "成华区",
                            "code": 2464
                        },
                        {
                            "name": "龙泉驿区",
                            "code": 2465
                        },
                        {
                            "name": "青白江区",
                            "code": 2466
                        },
                        {
                            "name": "新都区",
                            "code": 2467
                        },
                        {
                            "name": "温江区",
                            "code": 2468
                        },
                        {
                            "name": "金堂县",
                            "code": 2469
                        },
                        {
                            "name": "双流县",
                            "code": 2470
                        },
                        {
                            "name": "郫县",
                            "code": 2471
                        },
                        {
                            "name": "大邑县",
                            "code": 2472
                        },
                        {
                            "name": "蒲江县",
                            "code": 2473
                        },
                        {
                            "name": "新津县",
                            "code": 2474
                        },
                        {
                            "name": "都江堰市",
                            "code": 2475
                        },
                        {
                            "name": "彭州市",
                            "code": 2476
                        },
                        {
                            "name": "邛崃市",
                            "code": 2477
                        },
                        {
                            "name": "崇州市",
                            "code": 2478
                        }
                    ]
                },
                {
                    "name": "自贡市",
                    "code": 383,
                    "sub": [
                        {
                            "name": "自流井区",
                            "code": 2479
                        },
                        {
                            "name": "贡井区",
                            "code": 2480
                        },
                        {
                            "name": "大安区",
                            "code": 2481
                        },
                        {
                            "name": "沿滩区",
                            "code": 2482
                        },
                        {
                            "name": "荣县",
                            "code": 2483
                        },
                        {
                            "name": "富顺县",
                            "code": 2484
                        }
                    ]
                },
                {
                    "name": "攀枝花市",
                    "code": 384,
                    "sub": [
                        {
                            "name": "东区",
                            "code": 2485
                        },
                        {
                            "name": "西区",
                            "code": 2486
                        },
                        {
                            "name": "仁和区",
                            "code": 2487
                        },
                        {
                            "name": "米易县",
                            "code": 2488
                        },
                        {
                            "name": "盐边县",
                            "code": 2489
                        }
                    ]
                },
                {
                    "name": "泸州市",
                    "code": 385,
                    "sub": [
                        {
                            "name": "江阳区",
                            "code": 2490
                        },
                        {
                            "name": "纳溪区",
                            "code": 2491
                        },
                        {
                            "name": "龙马潭区",
                            "code": 2492
                        },
                        {
                            "name": "泸县",
                            "code": 2493
                        },
                        {
                            "name": "合江县",
                            "code": 2494
                        },
                        {
                            "name": "叙永县",
                            "code": 2495
                        },
                        {
                            "name": "古蔺县",
                            "code": 2496
                        }
                    ]
                },
                {
                    "name": "德阳市",
                    "code": 386,
                    "sub": [
                        {
                            "name": "旌阳区",
                            "code": 2497
                        },
                        {
                            "name": "中江县",
                            "code": 2498
                        },
                        {
                            "name": "罗江县",
                            "code": 2499
                        },
                        {
                            "name": "广汉市",
                            "code": 2500
                        },
                        {
                            "name": "什邡市",
                            "code": 2501
                        },
                        {
                            "name": "绵竹市",
                            "code": 2502
                        }
                    ]
                },
                {
                    "name": "绵阳市",
                    "code": 387,
                    "sub": [
                        {
                            "name": "涪城区",
                            "code": 2503
                        },
                        {
                            "name": "游仙区",
                            "code": 2504
                        },
                        {
                            "name": "三台县",
                            "code": 2505
                        },
                        {
                            "name": "盐亭县",
                            "code": 2506
                        },
                        {
                            "name": "安县",
                            "code": 2507
                        },
                        {
                            "name": "梓潼县",
                            "code": 2508
                        },
                        {
                            "name": "北川羌族自治县",
                            "code": 2509
                        },
                        {
                            "name": "平武县",
                            "code": 2510
                        },
                        {
                            "name": "江油市",
                            "code": 2511
                        }
                    ]
                },
                {
                    "name": "广元市",
                    "code": 388,
                    "sub": [
                        {
                            "name": "市中区",
                            "code": 2512
                        },
                        {
                            "name": "元坝区",
                            "code": 2513
                        },
                        {
                            "name": "朝天区",
                            "code": 2514
                        },
                        {
                            "name": "旺苍县",
                            "code": 2515
                        },
                        {
                            "name": "青川县",
                            "code": 2516
                        },
                        {
                            "name": "剑阁县",
                            "code": 2517
                        },
                        {
                            "name": "苍溪县",
                            "code": 2518
                        }
                    ]
                },
                {
                    "name": "遂宁市",
                    "code": 389,
                    "sub": [
                        {
                            "name": "船山区",
                            "code": 2519
                        },
                        {
                            "name": "安居区",
                            "code": 2520
                        },
                        {
                            "name": "蓬溪县",
                            "code": 2521
                        },
                        {
                            "name": "射洪县",
                            "code": 2522
                        },
                        {
                            "name": "大英县",
                            "code": 2523
                        }
                    ]
                },
                {
                    "name": "内江市",
                    "code": 390,
                    "sub": [
                        {
                            "name": "市中区",
                            "code": 2524
                        },
                        {
                            "name": "东兴区",
                            "code": 2525
                        },
                        {
                            "name": "威远县",
                            "code": 2526
                        },
                        {
                            "name": "资中县",
                            "code": 2527
                        },
                        {
                            "name": "隆昌县",
                            "code": 2528
                        }
                    ]
                },
                {
                    "name": "乐山市",
                    "code": 391,
                    "sub": [
                        {
                            "name": "市中区",
                            "code": 2529
                        },
                        {
                            "name": "沙湾区",
                            "code": 2530
                        },
                        {
                            "name": "五通桥区",
                            "code": 2531
                        },
                        {
                            "name": "金口河区",
                            "code": 2532
                        },
                        {
                            "name": "犍为县",
                            "code": 2533
                        },
                        {
                            "name": "井研县",
                            "code": 2534
                        },
                        {
                            "name": "夹江县",
                            "code": 2535
                        },
                        {
                            "name": "沐川县",
                            "code": 2536
                        },
                        {
                            "name": "峨边彝族自治县",
                            "code": 2537
                        },
                        {
                            "name": "马边彝族自治县",
                            "code": 2538
                        },
                        {
                            "name": "峨眉山市",
                            "code": 2539
                        }
                    ]
                },
                {
                    "name": "南充市",
                    "code": 392,
                    "sub": [
                        {
                            "name": "顺庆区",
                            "code": 2540
                        },
                        {
                            "name": "高坪区",
                            "code": 2541
                        },
                        {
                            "name": "嘉陵区",
                            "code": 2542
                        },
                        {
                            "name": "南部县",
                            "code": 2543
                        },
                        {
                            "name": "营山县",
                            "code": 2544
                        },
                        {
                            "name": "蓬安县",
                            "code": 2545
                        },
                        {
                            "name": "仪陇县",
                            "code": 2546
                        },
                        {
                            "name": "西充县",
                            "code": 2547
                        },
                        {
                            "name": "阆中市",
                            "code": 2548
                        }
                    ]
                },
                {
                    "name": "眉山市",
                    "code": 393,
                    "sub": [
                        {
                            "name": "东坡区",
                            "code": 2549
                        },
                        {
                            "name": "仁寿县",
                            "code": 2550
                        },
                        {
                            "name": "彭山县",
                            "code": 2551
                        },
                        {
                            "name": "洪雅县",
                            "code": 2552
                        },
                        {
                            "name": "丹棱县",
                            "code": 2553
                        },
                        {
                            "name": "青神县",
                            "code": 2554
                        }
                    ]
                },
                {
                    "name": "宜宾市",
                    "code": 394,
                    "sub": [
                        {
                            "name": "翠屏区",
                            "code": 2555
                        },
                        {
                            "name": "宜宾县",
                            "code": 2556
                        },
                        {
                            "name": "南溪县",
                            "code": 2557
                        },
                        {
                            "name": "江安县",
                            "code": 2558
                        },
                        {
                            "name": "长宁县",
                            "code": 2559
                        },
                        {
                            "name": "高县",
                            "code": 2560
                        },
                        {
                            "name": "珙县",
                            "code": 2561
                        },
                        {
                            "name": "筠连县",
                            "code": 2562
                        },
                        {
                            "name": "兴文县",
                            "code": 2563
                        },
                        {
                            "name": "屏山县",
                            "code": 2564
                        }
                    ]
                },
                {
                    "name": "广安市",
                    "code": 395,
                    "sub": [
                        {
                            "name": "广安区",
                            "code": 2565
                        },
                        {
                            "name": "岳池县",
                            "code": 2566
                        },
                        {
                            "name": "武胜县",
                            "code": 2567
                        },
                        {
                            "name": "邻水县",
                            "code": 2568
                        },
                        {
                            "name": "华蓥市",
                            "code": 2569
                        }
                    ]
                },
                {
                    "name": "达州市",
                    "code": 396,
                    "sub": [
                        {
                            "name": "通川区",
                            "code": 2570
                        },
                        {
                            "name": "达县",
                            "code": 2571
                        },
                        {
                            "name": "宣汉县",
                            "code": 2572
                        },
                        {
                            "name": "开江县",
                            "code": 2573
                        },
                        {
                            "name": "大竹县",
                            "code": 2574
                        },
                        {
                            "name": "渠县",
                            "code": 2575
                        },
                        {
                            "name": "万源市",
                            "code": 2576
                        }
                    ]
                },
                {
                    "name": "雅安市",
                    "code": 397,
                    "sub": [
                        {
                            "name": "雨城区",
                            "code": 2577
                        },
                        {
                            "name": "名山县",
                            "code": 2578
                        },
                        {
                            "name": "荥经县",
                            "code": 2579
                        },
                        {
                            "name": "汉源县",
                            "code": 2580
                        },
                        {
                            "name": "石棉县",
                            "code": 2581
                        },
                        {
                            "name": "天全县",
                            "code": 2582
                        },
                        {
                            "name": "芦山县",
                            "code": 2583
                        },
                        {
                            "name": "宝兴县",
                            "code": 2584
                        }
                    ]
                },
                {
                    "name": "巴中市",
                    "code": 398,
                    "sub": [
                        {
                            "name": "巴州区",
                            "code": 2585
                        },
                        {
                            "name": "通江县",
                            "code": 2586
                        },
                        {
                            "name": "南江县",
                            "code": 2587
                        },
                        {
                            "name": "平昌县",
                            "code": 2588
                        }
                    ]
                },
                {
                    "name": "资阳市",
                    "code": 399,
                    "sub": [
                        {
                            "name": "雁江区",
                            "code": 2589
                        },
                        {
                            "name": "安岳县",
                            "code": 2590
                        },
                        {
                            "name": "乐至县",
                            "code": 2591
                        },
                        {
                            "name": "简阳市",
                            "code": 2592
                        }
                    ]
                },
                {
                    "name": "阿坝州",
                    "code": 400,
                    "sub": [
                        {
                            "name": "汶川县",
                            "code": 2593
                        },
                        {
                            "name": "理县",
                            "code": 2594
                        },
                        {
                            "name": "茂县",
                            "code": 2595
                        },
                        {
                            "name": "松潘县",
                            "code": 2596
                        },
                        {
                            "name": "九寨沟县",
                            "code": 2597
                        },
                        {
                            "name": "金川县",
                            "code": 2598
                        },
                        {
                            "name": "小金县",
                            "code": 2599
                        },
                        {
                            "name": "黑水县",
                            "code": 2600
                        },
                        {
                            "name": "马尔康县",
                            "code": 2601
                        },
                        {
                            "name": "壤塘县",
                            "code": 2602
                        },
                        {
                            "name": "阿坝县",
                            "code": 2603
                        },
                        {
                            "name": "若尔盖县",
                            "code": 2604
                        },
                        {
                            "name": "红原县",
                            "code": 2605
                        }
                    ]
                },
                {
                    "name": "甘孜州",
                    "code": 401,
                    "sub": [
                        {
                            "name": "康定县",
                            "code": 2606
                        },
                        {
                            "name": "泸定县",
                            "code": 2607
                        },
                        {
                            "name": "丹巴县",
                            "code": 2608
                        },
                        {
                            "name": "九龙县",
                            "code": 2609
                        },
                        {
                            "name": "雅江县",
                            "code": 2610
                        },
                        {
                            "name": "道孚县",
                            "code": 2611
                        },
                        {
                            "name": "炉霍县",
                            "code": 2612
                        },
                        {
                            "name": "甘孜县",
                            "code": 2613
                        },
                        {
                            "name": "新龙县",
                            "code": 2614
                        },
                        {
                            "name": "德格县",
                            "code": 2615
                        },
                        {
                            "name": "白玉县",
                            "code": 2616
                        },
                        {
                            "name": "石渠县",
                            "code": 2617
                        },
                        {
                            "name": "色达县",
                            "code": 2618
                        },
                        {
                            "name": "理塘县",
                            "code": 2619
                        },
                        {
                            "name": "巴塘县",
                            "code": 2620
                        },
                        {
                            "name": "乡城县",
                            "code": 2621
                        },
                        {
                            "name": "稻城县",
                            "code": 2622
                        },
                        {
                            "name": "得荣县",
                            "code": 2623
                        }
                    ]
                },
                {
                    "name": "凉山州",
                    "code": 402,
                    "sub": [
                        {
                            "name": "西昌市",
                            "code": 2624
                        },
                        {
                            "name": "木里藏族自治县",
                            "code": 2625
                        },
                        {
                            "name": "盐源县",
                            "code": 2626
                        },
                        {
                            "name": "德昌县",
                            "code": 2627
                        },
                        {
                            "name": "会理县",
                            "code": 2628
                        },
                        {
                            "name": "会东县",
                            "code": 2629
                        },
                        {
                            "name": "宁南县",
                            "code": 2630
                        },
                        {
                            "name": "普格县",
                            "code": 2631
                        },
                        {
                            "name": "布拖县",
                            "code": 2632
                        },
                        {
                            "name": "金阳县",
                            "code": 2633
                        },
                        {
                            "name": "昭觉县",
                            "code": 2634
                        },
                        {
                            "name": "喜德县",
                            "code": 2635
                        },
                        {
                            "name": "冕宁县",
                            "code": 2636
                        },
                        {
                            "name": "越西县",
                            "code": 2637
                        },
                        {
                            "name": "甘洛县",
                            "code": 2638
                        },
                        {
                            "name": "美姑县",
                            "code": 2639
                        },
                        {
                            "name": "雷波县",
                            "code": 2640
                        }
                    ]
                }
            ]
        },
        {
            "name": "贵州省",
            "code": 25,
            "sub": [
                {
                    "name": "贵阳市",
                    "code": 403,
                    "sub": [
                        {
                            "name": "南明区",
                            "code": 2641
                        },
                        {
                            "name": "云岩区",
                            "code": 2642
                        },
                        {
                            "name": "花溪区",
                            "code": 2643
                        },
                        {
                            "name": "乌当区",
                            "code": 2644
                        },
                        {
                            "name": "白云区",
                            "code": 2645
                        },
                        {
                            "name": "小河区",
                            "code": 2646
                        },
                        {
                            "name": "开阳县",
                            "code": 2647
                        },
                        {
                            "name": "息烽县",
                            "code": 2648
                        },
                        {
                            "name": "修文县",
                            "code": 2649
                        },
                        {
                            "name": "清镇市",
                            "code": 2650
                        }
                    ]
                },
                {
                    "name": "六盘水市",
                    "code": 404,
                    "sub": [
                        {
                            "name": "钟山区",
                            "code": 2651
                        },
                        {
                            "name": "六枝特区",
                            "code": 2652
                        },
                        {
                            "name": "水城县",
                            "code": 2653
                        },
                        {
                            "name": "盘县",
                            "code": 2654
                        }
                    ]
                },
                {
                    "name": "遵义市",
                    "code": 405,
                    "sub": [
                        {
                            "name": "红花岗区",
                            "code": 2655
                        },
                        {
                            "name": "汇川区",
                            "code": 2656
                        },
                        {
                            "name": "遵义县",
                            "code": 2657
                        },
                        {
                            "name": "桐梓县",
                            "code": 2658
                        },
                        {
                            "name": "绥阳县",
                            "code": 2659
                        },
                        {
                            "name": "正安县",
                            "code": 2660
                        },
                        {
                            "name": "道真仡佬族苗族自治县",
                            "code": 2661
                        },
                        {
                            "name": "务川仡佬族苗族自治县",
                            "code": 2662
                        },
                        {
                            "name": "凤冈县",
                            "code": 2663
                        },
                        {
                            "name": "湄潭县",
                            "code": 2664
                        },
                        {
                            "name": "余庆县",
                            "code": 2665
                        },
                        {
                            "name": "习水县",
                            "code": 2666
                        },
                        {
                            "name": "赤水市",
                            "code": 2667
                        },
                        {
                            "name": "仁怀市",
                            "code": 2668
                        }
                    ]
                },
                {
                    "name": "安顺市",
                    "code": 406,
                    "sub": [
                        {
                            "name": "西秀区",
                            "code": 2669
                        },
                        {
                            "name": "平坝县",
                            "code": 2670
                        },
                        {
                            "name": "普定县",
                            "code": 2671
                        },
                        {
                            "name": "镇宁布依族苗族自治县",
                            "code": 2672
                        },
                        {
                            "name": "关岭布依族苗族自治县",
                            "code": 2673
                        },
                        {
                            "name": "紫云苗族布依族自治县",
                            "code": 2674
                        }
                    ]
                },
                {
                    "name": "铜仁地区",
                    "code": 407,
                    "sub": [
                        {
                            "name": "铜仁市",
                            "code": 2675
                        },
                        {
                            "name": "江口县",
                            "code": 2676
                        },
                        {
                            "name": "玉屏侗族自治县",
                            "code": 2677
                        },
                        {
                            "name": "石阡县",
                            "code": 2678
                        },
                        {
                            "name": "思南县",
                            "code": 2679
                        },
                        {
                            "name": "印江土家族苗族自治县",
                            "code": 2680
                        },
                        {
                            "name": "德江县",
                            "code": 2681
                        },
                        {
                            "name": "沿河土家族自治县",
                            "code": 2682
                        },
                        {
                            "name": "松桃苗族自治县",
                            "code": 2683
                        },
                        {
                            "name": "万山特区",
                            "code": 2684
                        }
                    ]
                },
                {
                    "name": "黔西南州",
                    "code": 408,
                    "sub": [
                        {
                            "name": "兴义市",
                            "code": 2685
                        },
                        {
                            "name": "兴仁县",
                            "code": 2686
                        },
                        {
                            "name": "普安县",
                            "code": 2687
                        },
                        {
                            "name": "晴隆县",
                            "code": 2688
                        },
                        {
                            "name": "贞丰县",
                            "code": 2689
                        },
                        {
                            "name": "望谟县",
                            "code": 2690
                        },
                        {
                            "name": "册亨县",
                            "code": 2691
                        },
                        {
                            "name": "安龙县",
                            "code": 2692
                        }
                    ]
                },
                {
                    "name": "毕节地区",
                    "code": 409,
                    "sub": [
                        {
                            "name": "毕节市",
                            "code": 2693
                        },
                        {
                            "name": "大方县",
                            "code": 2694
                        },
                        {
                            "name": "黔西县",
                            "code": 2695
                        },
                        {
                            "name": "金沙县",
                            "code": 2696
                        },
                        {
                            "name": "织金县",
                            "code": 2697
                        },
                        {
                            "name": "纳雍县",
                            "code": 2698
                        },
                        {
                            "name": "威宁彝族回族苗族自治县",
                            "code": 2699
                        },
                        {
                            "name": "赫章县",
                            "code": 2700
                        }
                    ]
                },
                {
                    "name": "黔东南州",
                    "code": 410,
                    "sub": [
                        {
                            "name": "凯里市",
                            "code": 2701
                        },
                        {
                            "name": "黄平县",
                            "code": 2702
                        },
                        {
                            "name": "施秉县",
                            "code": 2703
                        },
                        {
                            "name": "三穗县",
                            "code": 2704
                        },
                        {
                            "name": "镇远县",
                            "code": 2705
                        },
                        {
                            "name": "岑巩县",
                            "code": 2706
                        },
                        {
                            "name": "天柱县",
                            "code": 2707
                        },
                        {
                            "name": "锦屏县",
                            "code": 2708
                        },
                        {
                            "name": "剑河县",
                            "code": 2709
                        },
                        {
                            "name": "台江县",
                            "code": 2710
                        },
                        {
                            "name": "黎平县",
                            "code": 2711
                        },
                        {
                            "name": "榕江县",
                            "code": 2712
                        },
                        {
                            "name": "从江县",
                            "code": 2713
                        },
                        {
                            "name": "雷山县",
                            "code": 2714
                        },
                        {
                            "name": "麻江县",
                            "code": 2715
                        },
                        {
                            "name": "丹寨县",
                            "code": 2716
                        }
                    ]
                },
                {
                    "name": "黔南州",
                    "code": 411,
                    "sub": [
                        {
                            "name": "都匀市",
                            "code": 2717
                        },
                        {
                            "name": "福泉市",
                            "code": 2718
                        },
                        {
                            "name": "荔波县",
                            "code": 2719
                        },
                        {
                            "name": "贵定县",
                            "code": 2720
                        },
                        {
                            "name": "瓮安县",
                            "code": 2721
                        },
                        {
                            "name": "独山县",
                            "code": 2722
                        },
                        {
                            "name": "平塘县",
                            "code": 2723
                        },
                        {
                            "name": "罗甸县",
                            "code": 2724
                        },
                        {
                            "name": "长顺县",
                            "code": 2725
                        },
                        {
                            "name": "龙里县",
                            "code": 2726
                        },
                        {
                            "name": "惠水县",
                            "code": 2727
                        },
                        {
                            "name": "三都水族自治县",
                            "code": 2728
                        }
                    ]
                }
            ]
        },
        {
            "name": "云南省",
            "code": 26,
            "sub": [
                {
                    "name": "昆明市",
                    "code": 412,
                    "sub": [
                        {
                            "name": "五华区",
                            "code": 2729
                        },
                        {
                            "name": "盘龙区",
                            "code": 2730
                        },
                        {
                            "name": "官渡区",
                            "code": 2731
                        },
                        {
                            "name": "西山区",
                            "code": 2732
                        },
                        {
                            "name": "东川区",
                            "code": 2733
                        },
                        {
                            "name": "呈贡县",
                            "code": 2734
                        },
                        {
                            "name": "晋宁县",
                            "code": 2735
                        },
                        {
                            "name": "富民县",
                            "code": 2736
                        },
                        {
                            "name": "宜良县",
                            "code": 2737
                        },
                        {
                            "name": "石林彝族自治县",
                            "code": 2738
                        },
                        {
                            "name": "嵩明县",
                            "code": 2739
                        },
                        {
                            "name": "禄劝彝族苗族自治县",
                            "code": 2740
                        },
                        {
                            "name": "寻甸回族彝族自治县",
                            "code": 2741
                        },
                        {
                            "name": "安宁市",
                            "code": 2742
                        }
                    ]
                },
                {
                    "name": "曲靖市",
                    "code": 413,
                    "sub": [
                        {
                            "name": "麒麟区",
                            "code": 2743
                        },
                        {
                            "name": "马龙县",
                            "code": 2744
                        },
                        {
                            "name": "陆良县",
                            "code": 2745
                        },
                        {
                            "name": "师宗县",
                            "code": 2746
                        },
                        {
                            "name": "罗平县",
                            "code": 2747
                        },
                        {
                            "name": "富源县",
                            "code": 2748
                        },
                        {
                            "name": "会泽县",
                            "code": 2749
                        },
                        {
                            "name": "沾益县",
                            "code": 2750
                        },
                        {
                            "name": "宣威市",
                            "code": 2751
                        }
                    ]
                },
                {
                    "name": "玉溪市",
                    "code": 414,
                    "sub": [
                        {
                            "name": "红塔区",
                            "code": 2752
                        },
                        {
                            "name": "江川县",
                            "code": 2753
                        },
                        {
                            "name": "澄江县",
                            "code": 2754
                        },
                        {
                            "name": "通海县",
                            "code": 2755
                        },
                        {
                            "name": "华宁县",
                            "code": 2756
                        },
                        {
                            "name": "易门县",
                            "code": 2757
                        },
                        {
                            "name": "峨山彝族自治县",
                            "code": 2758
                        },
                        {
                            "name": "新平彝族傣族自治县",
                            "code": 2759
                        },
                        {
                            "name": "元江哈尼族彝族傣族自治县",
                            "code": 2760
                        }
                    ]
                },
                {
                    "name": "保山市",
                    "code": 415,
                    "sub": [
                        {
                            "name": "隆阳区",
                            "code": 2761
                        },
                        {
                            "name": "施甸县",
                            "code": 2762
                        },
                        {
                            "name": "腾冲县",
                            "code": 2763
                        },
                        {
                            "name": "龙陵县",
                            "code": 2764
                        },
                        {
                            "name": "昌宁县",
                            "code": 2765
                        }
                    ]
                },
                {
                    "name": "昭通市",
                    "code": 416,
                    "sub": [
                        {
                            "name": "昭阳区",
                            "code": 2766
                        },
                        {
                            "name": "鲁甸县",
                            "code": 2767
                        },
                        {
                            "name": "巧家县",
                            "code": 2768
                        },
                        {
                            "name": "盐津县",
                            "code": 2769
                        },
                        {
                            "name": "大关县",
                            "code": 2770
                        },
                        {
                            "name": "永善县",
                            "code": 2771
                        },
                        {
                            "name": "绥江县",
                            "code": 2772
                        },
                        {
                            "name": "镇雄县",
                            "code": 2773
                        },
                        {
                            "name": "彝良县",
                            "code": 2774
                        },
                        {
                            "name": "威信县",
                            "code": 2775
                        },
                        {
                            "name": "水富县",
                            "code": 2776
                        }
                    ]
                },
                {
                    "name": "丽江市",
                    "code": 417,
                    "sub": [
                        {
                            "name": "古城区",
                            "code": 2777
                        },
                        {
                            "name": "玉龙纳西族自治县",
                            "code": 2778
                        },
                        {
                            "name": "永胜县",
                            "code": 2779
                        },
                        {
                            "name": "华坪县",
                            "code": 2780
                        },
                        {
                            "name": "宁蒗彝族自治县",
                            "code": 2781
                        }
                    ]
                },
                {
                    "name": "思茅市",
                    "code": 418,
                    "sub": [
                        {
                            "name": "翠云区",
                            "code": 2782
                        },
                        {
                            "name": "普洱哈尼族彝族自治县",
                            "code": 2783
                        },
                        {
                            "name": "墨江哈尼族自治县",
                            "code": 2784
                        },
                        {
                            "name": "景东彝族自治县",
                            "code": 2785
                        },
                        {
                            "name": "景谷傣族彝族自治县",
                            "code": 2786
                        },
                        {
                            "name": "镇沅彝族哈尼族拉祜族自治县",
                            "code": 2787
                        },
                        {
                            "name": "江城哈尼族彝族自治县",
                            "code": 2788
                        },
                        {
                            "name": "孟连傣族拉祜族佤族自治县",
                            "code": 2789
                        },
                        {
                            "name": "澜沧拉祜族自治县",
                            "code": 2790
                        },
                        {
                            "name": "西盟佤族自治县",
                            "code": 2791
                        }
                    ]
                },
                {
                    "name": "临沧市",
                    "code": 419,
                    "sub": [
                        {
                            "name": "临翔区",
                            "code": 2792
                        },
                        {
                            "name": "凤庆县",
                            "code": 2793
                        },
                        {
                            "name": "云县",
                            "code": 2794
                        },
                        {
                            "name": "永德县",
                            "code": 2795
                        },
                        {
                            "name": "镇康县",
                            "code": 2796
                        },
                        {
                            "name": "双江拉祜族佤族布朗族傣族自治县",
                            "code": 2797
                        },
                        {
                            "name": "耿马傣族佤族自治县",
                            "code": 2798
                        }
                    ]
                },
                {
                    "name": "楚雄州",
                    "code": 420,
                    "sub": [
                        {
                            "name": "沧源佤族自治县",
                            "code": 2799
                        },
                        {
                            "name": "楚雄市",
                            "code": 2800
                        },
                        {
                            "name": "双柏县",
                            "code": 2801
                        },
                        {
                            "name": "牟定县",
                            "code": 2802
                        },
                        {
                            "name": "南华县",
                            "code": 2803
                        },
                        {
                            "name": "姚安县",
                            "code": 2804
                        },
                        {
                            "name": "大姚县",
                            "code": 2805
                        },
                        {
                            "name": "永仁县",
                            "code": 2806
                        },
                        {
                            "name": "元谋县",
                            "code": 2807
                        },
                        {
                            "name": "武定县",
                            "code": 2808
                        },
                        {
                            "name": "禄丰县",
                            "code": 2809
                        }
                    ]
                },
                {
                    "name": "红河州",
                    "code": 421,
                    "sub": [
                        {
                            "name": "个旧市",
                            "code": 2810
                        },
                        {
                            "name": "开远市",
                            "code": 2811
                        },
                        {
                            "name": "蒙自县",
                            "code": 2812
                        },
                        {
                            "name": "屏边苗族自治县",
                            "code": 2813
                        },
                        {
                            "name": "建水县",
                            "code": 2814
                        },
                        {
                            "name": "石屏县",
                            "code": 2815
                        },
                        {
                            "name": "弥勒县",
                            "code": 2816
                        },
                        {
                            "name": "泸西县",
                            "code": 2817
                        },
                        {
                            "name": "元阳县",
                            "code": 2818
                        },
                        {
                            "name": "红河县",
                            "code": 2819
                        },
                        {
                            "name": "金平苗族瑶族傣族自治县",
                            "code": 2820
                        },
                        {
                            "name": "绿春县",
                            "code": 2821
                        },
                        {
                            "name": "河口瑶族自治县",
                            "code": 2822
                        }
                    ]
                },
                {
                    "name": "文山州",
                    "code": 422,
                    "sub": [
                        {
                            "name": "文山县",
                            "code": 2823
                        },
                        {
                            "name": "砚山县",
                            "code": 2824
                        },
                        {
                            "name": "西畴县",
                            "code": 2825
                        },
                        {
                            "name": "麻栗坡县",
                            "code": 2826
                        },
                        {
                            "name": "马关县",
                            "code": 2827
                        },
                        {
                            "name": "丘北县",
                            "code": 2828
                        },
                        {
                            "name": "广南县",
                            "code": 2829
                        },
                        {
                            "name": "富宁县",
                            "code": 2830
                        }
                    ]
                },
                {
                    "name": "西双版纳",
                    "code": 423,
                    "sub": [
                        {
                            "name": "景洪市",
                            "code": 2831
                        },
                        {
                            "name": "勐海县",
                            "code": 2832
                        },
                        {
                            "name": "勐腊县",
                            "code": 2833
                        }
                    ]
                },
                {
                    "name": "大理",
                    "code": 424,
                    "sub": [
                        {
                            "name": "大理市",
                            "code": 2834
                        },
                        {
                            "name": "漾濞彝族自治县",
                            "code": 2835
                        },
                        {
                            "name": "祥云县",
                            "code": 2836
                        },
                        {
                            "name": "宾川县",
                            "code": 2837
                        },
                        {
                            "name": "弥渡县",
                            "code": 2838
                        },
                        {
                            "name": "南涧彝族自治县",
                            "code": 2839
                        },
                        {
                            "name": "巍山彝族回族自治县",
                            "code": 2840
                        },
                        {
                            "name": "永平县",
                            "code": 2841
                        },
                        {
                            "name": "云龙县",
                            "code": 2842
                        },
                        {
                            "name": "洱源县",
                            "code": 2843
                        },
                        {
                            "name": "剑川县",
                            "code": 2844
                        },
                        {
                            "name": "鹤庆县",
                            "code": 2845
                        }
                    ]
                },
                {
                    "name": "德宏",
                    "code": 425,
                    "sub": [
                        {
                            "name": "瑞丽市",
                            "code": 2846
                        },
                        {
                            "name": "潞西市",
                            "code": 2847
                        },
                        {
                            "name": "梁河县",
                            "code": 2848
                        },
                        {
                            "name": "盈江县",
                            "code": 2849
                        },
                        {
                            "name": "陇川县",
                            "code": 2850
                        }
                    ]
                },
                {
                    "name": "怒江",
                    "code": 426,
                    "sub": [
                        {
                            "name": "泸水县",
                            "code": 2851
                        },
                        {
                            "name": "福贡县",
                            "code": 2852
                        },
                        {
                            "name": "贡山独龙族怒族自治县",
                            "code": 2853
                        },
                        {
                            "name": "兰坪白族普米族自治县",
                            "code": 2854
                        }
                    ]
                },
                {
                    "name": "迪庆",
                    "code": 427,
                    "sub": [
                        {
                            "name": "香格里拉县",
                            "code": 2855
                        },
                        {
                            "name": "德钦县",
                            "code": 2856
                        },
                        {
                            "name": "维西傈僳族自治县",
                            "code": 2857
                        }
                    ]
                }
            ]
        },
        {
            "name": "西藏",
            "code": 27,
            "sub": [
                {
                    "name": "拉萨市",
                    "code": 428,
                    "sub": [
                        {
                            "name": "城关区",
                            "code": 2858
                        },
                        {
                            "name": "林周县",
                            "code": 2859
                        },
                        {
                            "name": "当雄县",
                            "code": 2860
                        },
                        {
                            "name": "尼木县",
                            "code": 2861
                        },
                        {
                            "name": "曲水县",
                            "code": 2862
                        },
                        {
                            "name": "堆龙德庆县",
                            "code": 2863
                        },
                        {
                            "name": "达孜县",
                            "code": 2864
                        },
                        {
                            "name": "墨竹工卡县",
                            "code": 2865
                        }
                    ]
                },
                {
                    "name": "昌都",
                    "code": 429,
                    "sub": [
                        {
                            "name": "昌都县",
                            "code": 2866
                        },
                        {
                            "name": "江达县",
                            "code": 2867
                        },
                        {
                            "name": "贡觉县",
                            "code": 2868
                        },
                        {
                            "name": "类乌齐县",
                            "code": 2869
                        },
                        {
                            "name": "丁青县",
                            "code": 2870
                        },
                        {
                            "name": "察雅县",
                            "code": 2871
                        },
                        {
                            "name": "八宿县",
                            "code": 2872
                        },
                        {
                            "name": "左贡县",
                            "code": 2873
                        },
                        {
                            "name": "芒康县",
                            "code": 2874
                        },
                        {
                            "name": "洛隆县",
                            "code": 2875
                        },
                        {
                            "name": "边坝县",
                            "code": 2876
                        }
                    ]
                },
                {
                    "name": "山南",
                    "code": 430,
                    "sub": [
                        {
                            "name": "乃东县",
                            "code": 2877
                        },
                        {
                            "name": "扎囊县",
                            "code": 2878
                        },
                        {
                            "name": "贡嘎县",
                            "code": 2879
                        },
                        {
                            "name": "桑日县",
                            "code": 2880
                        },
                        {
                            "name": "琼结县",
                            "code": 2881
                        },
                        {
                            "name": "曲松县",
                            "code": 2882
                        },
                        {
                            "name": "措美县",
                            "code": 2883
                        },
                        {
                            "name": "洛扎县",
                            "code": 2884
                        },
                        {
                            "name": "加查县",
                            "code": 2885
                        },
                        {
                            "name": "隆子县",
                            "code": 2886
                        },
                        {
                            "name": "错那县",
                            "code": 2887
                        },
                        {
                            "name": "浪卡子县",
                            "code": 2888
                        }
                    ]
                },
                {
                    "name": "日喀则",
                    "code": 431,
                    "sub": [
                        {
                            "name": "日喀则市",
                            "code": 2889
                        },
                        {
                            "name": "南木林县",
                            "code": 2890
                        },
                        {
                            "name": "江孜县",
                            "code": 2891
                        },
                        {
                            "name": "定日县",
                            "code": 2892
                        },
                        {
                            "name": "萨迦县",
                            "code": 2893
                        },
                        {
                            "name": "拉孜县",
                            "code": 2894
                        },
                        {
                            "name": "昂仁县",
                            "code": 2895
                        },
                        {
                            "name": "谢通门县",
                            "code": 2896
                        },
                        {
                            "name": "白朗县",
                            "code": 2897
                        },
                        {
                            "name": "仁布县",
                            "code": 2898
                        },
                        {
                            "name": "康马县",
                            "code": 2899
                        },
                        {
                            "name": "定结县",
                            "code": 2900
                        },
                        {
                            "name": "仲巴县",
                            "code": 2901
                        },
                        {
                            "name": "亚东县",
                            "code": 2902
                        },
                        {
                            "name": "吉隆县",
                            "code": 2903
                        },
                        {
                            "name": "聂拉木县",
                            "code": 2904
                        },
                        {
                            "name": "萨嘎县",
                            "code": 2905
                        },
                        {
                            "name": "岗巴县",
                            "code": 2906
                        }
                    ]
                },
                {
                    "name": "那曲",
                    "code": 432,
                    "sub": [
                        {
                            "name": "那曲县",
                            "code": 2907
                        },
                        {
                            "name": "嘉黎县",
                            "code": 2908
                        },
                        {
                            "name": "比如县",
                            "code": 2909
                        },
                        {
                            "name": "聂荣县",
                            "code": 2910
                        },
                        {
                            "name": "安多县",
                            "code": 2911
                        },
                        {
                            "name": "申扎县",
                            "code": 2912
                        },
                        {
                            "name": "索县",
                            "code": 2913
                        },
                        {
                            "name": "班戈县",
                            "code": 2914
                        },
                        {
                            "name": "巴青县",
                            "code": 2915
                        },
                        {
                            "name": "尼玛县",
                            "code": 2916
                        }
                    ]
                },
                {
                    "name": "阿里",
                    "code": 433,
                    "sub": [
                        {
                            "name": "普兰县",
                            "code": 2917
                        },
                        {
                            "name": "札达县",
                            "code": 2918
                        },
                        {
                            "name": "噶尔县",
                            "code": 2919
                        },
                        {
                            "name": "日土县",
                            "code": 2920
                        },
                        {
                            "name": "革吉县",
                            "code": 2921
                        },
                        {
                            "name": "改则县",
                            "code": 2922
                        },
                        {
                            "name": "措勤县",
                            "code": 2923
                        }
                    ]
                },
                {
                    "name": "林芝",
                    "code": 434,
                    "sub": [
                        {
                            "name": "林芝县",
                            "code": 2924
                        },
                        {
                            "name": "工布江达县",
                            "code": 2925
                        },
                        {
                            "name": "米林县",
                            "code": 2926
                        },
                        {
                            "name": "墨脱县",
                            "code": 2927
                        },
                        {
                            "name": "波密县",
                            "code": 2928
                        },
                        {
                            "name": "察隅县",
                            "code": 2929
                        },
                        {
                            "name": "朗县",
                            "code": 2930
                        }
                    ]
                }
            ]
        },
        {
            "name": "陕西省",
            "code": 28,
            "sub": [
                {
                    "name": "西安市",
                    "code": 435,
                    "sub": [
                        {
                            "name": "新城区",
                            "code": 2931
                        },
                        {
                            "name": "碑林区",
                            "code": 2932
                        },
                        {
                            "name": "莲湖区",
                            "code": 2933
                        },
                        {
                            "name": "灞桥区",
                            "code": 2934
                        },
                        {
                            "name": "未央区",
                            "code": 2935
                        },
                        {
                            "name": "雁塔区",
                            "code": 2936
                        },
                        {
                            "name": "阎良区",
                            "code": 2937
                        },
                        {
                            "name": "临潼区",
                            "code": 2938
                        },
                        {
                            "name": "长安区",
                            "code": 2939
                        },
                        {
                            "name": "蓝田县",
                            "code": 2940
                        },
                        {
                            "name": "周至县",
                            "code": 2941
                        },
                        {
                            "name": "户县",
                            "code": 2942
                        },
                        {
                            "name": "高陵县",
                            "code": 2943
                        }
                    ]
                },
                {
                    "name": "铜川市",
                    "code": 436,
                    "sub": [
                        {
                            "name": "王益区",
                            "code": 2944
                        },
                        {
                            "name": "印台区",
                            "code": 2945
                        },
                        {
                            "name": "耀州区",
                            "code": 2946
                        },
                        {
                            "name": "宜君县",
                            "code": 2947
                        }
                    ]
                },
                {
                    "name": "宝鸡市",
                    "code": 437,
                    "sub": [
                        {
                            "name": "渭滨区",
                            "code": 2948
                        },
                        {
                            "name": "金台区",
                            "code": 2949
                        },
                        {
                            "name": "陈仓区",
                            "code": 2950
                        },
                        {
                            "name": "凤翔县",
                            "code": 2951
                        },
                        {
                            "name": "岐山县",
                            "code": 2952
                        },
                        {
                            "name": "扶风县",
                            "code": 2953
                        },
                        {
                            "name": "眉县",
                            "code": 2954
                        },
                        {
                            "name": "陇县",
                            "code": 2955
                        },
                        {
                            "name": "千阳县",
                            "code": 2956
                        },
                        {
                            "name": "麟游县",
                            "code": 2957
                        },
                        {
                            "name": "凤县",
                            "code": 2958
                        },
                        {
                            "name": "太白县",
                            "code": 2959
                        }
                    ]
                },
                {
                    "name": "咸阳市",
                    "code": 438,
                    "sub": [
                        {
                            "name": "秦都区",
                            "code": 2960
                        },
                        {
                            "name": "杨凌区",
                            "code": 2961
                        },
                        {
                            "name": "渭城区",
                            "code": 2962
                        },
                        {
                            "name": "三原县",
                            "code": 2963
                        },
                        {
                            "name": "泾阳县",
                            "code": 2964
                        },
                        {
                            "name": "乾县",
                            "code": 2965
                        },
                        {
                            "name": "礼泉县",
                            "code": 2966
                        },
                        {
                            "name": "永寿县",
                            "code": 2967
                        },
                        {
                            "name": "彬县",
                            "code": 2968
                        },
                        {
                            "name": "长武县",
                            "code": 2969
                        },
                        {
                            "name": "旬邑县",
                            "code": 2970
                        },
                        {
                            "name": "淳化县",
                            "code": 2971
                        },
                        {
                            "name": "武功县",
                            "code": 2972
                        },
                        {
                            "name": "兴平市",
                            "code": 2973
                        }
                    ]
                },
                {
                    "name": "渭南市",
                    "code": 439,
                    "sub": [
                        {
                            "name": "临渭区",
                            "code": 2974
                        },
                        {
                            "name": "华县",
                            "code": 2975
                        },
                        {
                            "name": "潼关县",
                            "code": 2976
                        },
                        {
                            "name": "大荔县",
                            "code": 2977
                        },
                        {
                            "name": "合阳县",
                            "code": 2978
                        },
                        {
                            "name": "澄城县",
                            "code": 2979
                        },
                        {
                            "name": "蒲城县",
                            "code": 2980
                        },
                        {
                            "name": "白水县",
                            "code": 2981
                        },
                        {
                            "name": "富平县",
                            "code": 2982
                        },
                        {
                            "name": "韩城市",
                            "code": 2983
                        },
                        {
                            "name": "华阴市",
                            "code": 2984
                        }
                    ]
                },
                {
                    "name": "延安市",
                    "code": 440,
                    "sub": [
                        {
                            "name": "宝塔区",
                            "code": 2985
                        },
                        {
                            "name": "延长县",
                            "code": 2986
                        },
                        {
                            "name": "延川县",
                            "code": 2987
                        },
                        {
                            "name": "子长县",
                            "code": 2988
                        },
                        {
                            "name": "安塞县",
                            "code": 2989
                        },
                        {
                            "name": "志丹县",
                            "code": 2990
                        },
                        {
                            "name": "吴起县",
                            "code": 2991
                        },
                        {
                            "name": "甘泉县",
                            "code": 2992
                        },
                        {
                            "name": "富县",
                            "code": 2993
                        },
                        {
                            "name": "洛川县",
                            "code": 2994
                        },
                        {
                            "name": "宜川县",
                            "code": 2995
                        },
                        {
                            "name": "黄龙县",
                            "code": 2996
                        },
                        {
                            "name": "黄陵县",
                            "code": 2997
                        }
                    ]
                },
                {
                    "name": "汉中市",
                    "code": 441,
                    "sub": [
                        {
                            "name": "汉台区",
                            "code": 2998
                        },
                        {
                            "name": "南郑县",
                            "code": 2999
                        },
                        {
                            "name": "城固县",
                            "code": 3000
                        },
                        {
                            "name": "洋县",
                            "code": 3001
                        },
                        {
                            "name": "西乡县",
                            "code": 3002
                        },
                        {
                            "name": "勉县",
                            "code": 3003
                        },
                        {
                            "name": "宁强县",
                            "code": 3004
                        },
                        {
                            "name": "略阳县",
                            "code": 3005
                        },
                        {
                            "name": "镇巴县",
                            "code": 3006
                        },
                        {
                            "name": "留坝县",
                            "code": 3007
                        },
                        {
                            "name": "佛坪县",
                            "code": 3008
                        }
                    ]
                },
                {
                    "name": "榆林市",
                    "code": 442,
                    "sub": [
                        {
                            "name": "榆阳区",
                            "code": 3009
                        },
                        {
                            "name": "神木县",
                            "code": 3010
                        },
                        {
                            "name": "府谷县",
                            "code": 3011
                        },
                        {
                            "name": "横山县",
                            "code": 3012
                        },
                        {
                            "name": "靖边县",
                            "code": 3013
                        },
                        {
                            "name": "定边县",
                            "code": 3014
                        },
                        {
                            "name": "绥德县",
                            "code": 3015
                        },
                        {
                            "name": "米脂县",
                            "code": 3016
                        },
                        {
                            "name": "佳县",
                            "code": 3017
                        },
                        {
                            "name": "吴堡县",
                            "code": 3018
                        },
                        {
                            "name": "清涧县",
                            "code": 3019
                        },
                        {
                            "name": "子洲县",
                            "code": 3020
                        }
                    ]
                },
                {
                    "name": "安康市",
                    "code": 443,
                    "sub": [
                        {
                            "name": "汉滨区",
                            "code": 3021
                        },
                        {
                            "name": "汉阴县",
                            "code": 3022
                        },
                        {
                            "name": "石泉县",
                            "code": 3023
                        },
                        {
                            "name": "宁陕县",
                            "code": 3024
                        },
                        {
                            "name": "紫阳县",
                            "code": 3025
                        },
                        {
                            "name": "岚皋县",
                            "code": 3026
                        },
                        {
                            "name": "平利县",
                            "code": 3027
                        },
                        {
                            "name": "镇坪县",
                            "code": 3028
                        },
                        {
                            "name": "旬阳县",
                            "code": 3029
                        },
                        {
                            "name": "白河县",
                            "code": 3030
                        }
                    ]
                },
                {
                    "name": "商洛市",
                    "code": 444,
                    "sub": [
                        {
                            "name": "商州区",
                            "code": 3031
                        },
                        {
                            "name": "洛南县",
                            "code": 3032
                        },
                        {
                            "name": "丹凤县",
                            "code": 3033
                        },
                        {
                            "name": "商南县",
                            "code": 3034
                        },
                        {
                            "name": "山阳县",
                            "code": 3035
                        },
                        {
                            "name": "镇安县",
                            "code": 3036
                        },
                        {
                            "name": "柞水县",
                            "code": 3037
                        }
                    ]
                }
            ]
        },
        {
            "name": "甘肃省",
            "code": 29,
            "sub": [
                {
                    "name": "兰州市",
                    "code": 445,
                    "sub": [
                        {
                            "name": "城关区",
                            "code": 3038
                        },
                        {
                            "name": "七里河区",
                            "code": 3039
                        },
                        {
                            "name": "西固区",
                            "code": 3040
                        },
                        {
                            "name": "安宁区",
                            "code": 3041
                        },
                        {
                            "name": "红古区",
                            "code": 3042
                        },
                        {
                            "name": "永登县",
                            "code": 3043
                        },
                        {
                            "name": "皋兰县",
                            "code": 3044
                        },
                        {
                            "name": "榆中县",
                            "code": 3045
                        }
                    ]
                },
                {
                    "name": "嘉峪关市",
                    "code": 446
                },
                {
                    "name": "金昌市",
                    "code": 447,
                    "sub": [
                        {
                            "name": "金川区",
                            "code": 3046
                        },
                        {
                            "name": "永昌县",
                            "code": 3047
                        }
                    ]
                },
                {
                    "name": "白银市",
                    "code": 448,
                    "sub": [
                        {
                            "name": "白银区",
                            "code": 3048
                        },
                        {
                            "name": "平川区",
                            "code": 3049
                        },
                        {
                            "name": "靖远县",
                            "code": 3050
                        },
                        {
                            "name": "会宁县",
                            "code": 3051
                        },
                        {
                            "name": "景泰县",
                            "code": 3052
                        }
                    ]
                },
                {
                    "name": "天水市",
                    "code": 449,
                    "sub": [
                        {
                            "name": "秦城区",
                            "code": 3053
                        },
                        {
                            "name": "北道区",
                            "code": 3054
                        },
                        {
                            "name": "清水县",
                            "code": 3055
                        },
                        {
                            "name": "秦安县",
                            "code": 3056
                        },
                        {
                            "name": "甘谷县",
                            "code": 3057
                        },
                        {
                            "name": "武山县",
                            "code": 3058
                        },
                        {
                            "name": "张家川回族自治县",
                            "code": 3059
                        }
                    ]
                },
                {
                    "name": "武威市",
                    "code": 450,
                    "sub": [
                        {
                            "name": "凉州区",
                            "code": 3060
                        },
                        {
                            "name": "民勤县",
                            "code": 3061
                        },
                        {
                            "name": "古浪县",
                            "code": 3062
                        },
                        {
                            "name": "天祝藏族自治县",
                            "code": 3063
                        }
                    ]
                },
                {
                    "name": "张掖市",
                    "code": 451,
                    "sub": [
                        {
                            "name": "甘州区",
                            "code": 3064
                        },
                        {
                            "name": "肃南裕固族自治县",
                            "code": 3065
                        },
                        {
                            "name": "民乐县",
                            "code": 3066
                        },
                        {
                            "name": "临泽县",
                            "code": 3067
                        },
                        {
                            "name": "高台县",
                            "code": 3068
                        },
                        {
                            "name": "山丹县",
                            "code": 3069
                        }
                    ]
                },
                {
                    "name": "平凉市",
                    "code": 452,
                    "sub": [
                        {
                            "name": "崆峒区",
                            "code": 3070
                        },
                        {
                            "name": "泾川县",
                            "code": 3071
                        },
                        {
                            "name": "灵台县",
                            "code": 3072
                        },
                        {
                            "name": "崇信县",
                            "code": 3073
                        },
                        {
                            "name": "华亭县",
                            "code": 3074
                        },
                        {
                            "name": "庄浪县",
                            "code": 3075
                        },
                        {
                            "name": "静宁县",
                            "code": 3076
                        }
                    ]
                },
                {
                    "name": "酒泉市",
                    "code": 453,
                    "sub": [
                        {
                            "name": "肃州区",
                            "code": 3077
                        },
                        {
                            "name": "金塔县",
                            "code": 3078
                        },
                        {
                            "name": "瓜州县",
                            "code": 3079
                        },
                        {
                            "name": "肃北蒙古族自治县",
                            "code": 3080
                        },
                        {
                            "name": "阿克塞哈萨克族自治县",
                            "code": 3081
                        },
                        {
                            "name": "玉门市",
                            "code": 3082
                        },
                        {
                            "name": "敦煌市",
                            "code": 3083
                        }
                    ]
                },
                {
                    "name": "庆阳市",
                    "code": 454,
                    "sub": [
                        {
                            "name": "西峰区",
                            "code": 3084
                        },
                        {
                            "name": "庆城县",
                            "code": 3085
                        },
                        {
                            "name": "环县",
                            "code": 3086
                        },
                        {
                            "name": "华池县",
                            "code": 3087
                        },
                        {
                            "name": "合水县",
                            "code": 3088
                        },
                        {
                            "name": "正宁县",
                            "code": 3089
                        },
                        {
                            "name": "宁县",
                            "code": 3090
                        },
                        {
                            "name": "镇原县",
                            "code": 3091
                        }
                    ]
                },
                {
                    "name": "定西市",
                    "code": 455,
                    "sub": [
                        {
                            "name": "安定区",
                            "code": 3092
                        },
                        {
                            "name": "通渭县",
                            "code": 3093
                        },
                        {
                            "name": "陇西县",
                            "code": 3094
                        },
                        {
                            "name": "渭源县",
                            "code": 3095
                        },
                        {
                            "name": "临洮县",
                            "code": 3096
                        },
                        {
                            "name": "漳县",
                            "code": 3097
                        },
                        {
                            "name": "岷县",
                            "code": 3098
                        }
                    ]
                },
                {
                    "name": "陇南市",
                    "code": 456,
                    "sub": [
                        {
                            "name": "武都区",
                            "code": 3099
                        },
                        {
                            "name": "成县",
                            "code": 3100
                        },
                        {
                            "name": "文县",
                            "code": 3101
                        },
                        {
                            "name": "宕昌县",
                            "code": 3102
                        },
                        {
                            "name": "康县",
                            "code": 3103
                        },
                        {
                            "name": "西和县",
                            "code": 3104
                        },
                        {
                            "name": "礼县",
                            "code": 3105
                        },
                        {
                            "name": "徽县",
                            "code": 3106
                        },
                        {
                            "name": "两当县",
                            "code": 3107
                        }
                    ]
                },
                {
                    "name": "临夏州",
                    "code": 457,
                    "sub": [
                        {
                            "name": "临夏市",
                            "code": 3108
                        },
                        {
                            "name": "临夏县",
                            "code": 3109
                        },
                        {
                            "name": "康乐县",
                            "code": 3110
                        },
                        {
                            "name": "永靖县",
                            "code": 3111
                        },
                        {
                            "name": "广河县",
                            "code": 3112
                        },
                        {
                            "name": "和政县",
                            "code": 3113
                        },
                        {
                            "name": "东乡族自治县",
                            "code": 3114
                        },
                        {
                            "name": "积石山保安族东乡族撒拉族自治县",
                            "code": 3115
                        }
                    ]
                },
                {
                    "name": "甘州",
                    "code": 458,
                    "sub": [
                        {
                            "name": "合作市",
                            "code": 3116
                        },
                        {
                            "name": "临潭县",
                            "code": 3117
                        },
                        {
                            "name": "卓尼县",
                            "code": 3118
                        },
                        {
                            "name": "舟曲县",
                            "code": 3119
                        },
                        {
                            "name": "迭部县",
                            "code": 3120
                        },
                        {
                            "name": "玛曲县",
                            "code": 3121
                        },
                        {
                            "name": "碌曲县",
                            "code": 3122
                        },
                        {
                            "name": "夏河县",
                            "code": 3123
                        }
                    ]
                }
            ]
        },
        {
            "name": "青海省",
            "code": 30,
            "sub": [
                {
                    "name": "西宁市",
                    "code": 459,
                    "sub": [
                        {
                            "name": "城东区",
                            "code": 3124
                        },
                        {
                            "name": "城中区",
                            "code": 3125
                        },
                        {
                            "name": "城西区",
                            "code": 3126
                        },
                        {
                            "name": "城北区",
                            "code": 3127
                        },
                        {
                            "name": "大通回族土族自治县",
                            "code": 3128
                        },
                        {
                            "name": "湟中县",
                            "code": 3129
                        },
                        {
                            "name": "湟源县",
                            "code": 3130
                        }
                    ]
                },
                {
                    "name": "海东地区",
                    "code": 460,
                    "sub": [
                        {
                            "name": "平安县",
                            "code": 3131
                        },
                        {
                            "name": "民和回族土族自治县",
                            "code": 3132
                        },
                        {
                            "name": "乐都县",
                            "code": 3133
                        },
                        {
                            "name": "互助土族自治县",
                            "code": 3134
                        },
                        {
                            "name": "化隆回族自治县",
                            "code": 3135
                        },
                        {
                            "name": "循化撒拉族自治县",
                            "code": 3136
                        }
                    ]
                },
                {
                    "name": "海州",
                    "code": 461,
                    "sub": [
                        {
                            "name": "门源回族自治县",
                            "code": 3137
                        },
                        {
                            "name": "祁连县",
                            "code": 3138
                        },
                        {
                            "name": "海晏县",
                            "code": 3139
                        },
                        {
                            "name": "刚察县",
                            "code": 3140
                        }
                    ]
                },
                {
                    "name": "黄南州",
                    "code": 462,
                    "sub": [
                        {
                            "name": "同仁县",
                            "code": 3141
                        },
                        {
                            "name": "尖扎县",
                            "code": 3142
                        },
                        {
                            "name": "泽库县",
                            "code": 3143
                        },
                        {
                            "name": "河南蒙古族自治县",
                            "code": 3144
                        }
                    ]
                },
                {
                    "name": "海南州",
                    "code": 463,
                    "sub": [
                        {
                            "name": "共和县",
                            "code": 3145
                        },
                        {
                            "name": "同德县",
                            "code": 3146
                        },
                        {
                            "name": "贵德县",
                            "code": 3147
                        },
                        {
                            "name": "兴海县",
                            "code": 3148
                        },
                        {
                            "name": "贵南县",
                            "code": 3149
                        }
                    ]
                },
                {
                    "name": "果洛州",
                    "code": 464,
                    "sub": [
                        {
                            "name": "玛沁县",
                            "code": 3150
                        },
                        {
                            "name": "班玛县",
                            "code": 3151
                        },
                        {
                            "name": "甘德县",
                            "code": 3152
                        },
                        {
                            "name": "达日县",
                            "code": 3153
                        },
                        {
                            "name": "久治县",
                            "code": 3154
                        },
                        {
                            "name": "玛多县",
                            "code": 3155
                        }
                    ]
                },
                {
                    "name": "玉树州",
                    "code": 465,
                    "sub": [
                        {
                            "name": "玉树县",
                            "code": 3156
                        },
                        {
                            "name": "杂多县",
                            "code": 3157
                        },
                        {
                            "name": "称多县",
                            "code": 3158
                        },
                        {
                            "name": "治多县",
                            "code": 3159
                        },
                        {
                            "name": "囊谦县",
                            "code": 3160
                        },
                        {
                            "name": "曲麻莱县",
                            "code": 3161
                        }
                    ]
                },
                {
                    "name": "海西州",
                    "code": 466,
                    "sub": [
                        {
                            "name": "格尔木市",
                            "code": 3162
                        },
                        {
                            "name": "德令哈市",
                            "code": 3163
                        },
                        {
                            "name": "乌兰县",
                            "code": 3164
                        },
                        {
                            "name": "都兰县",
                            "code": 3165
                        },
                        {
                            "name": "天峻县",
                            "code": 3166
                        }
                    ]
                }
            ]
        },
        {
            "name": "宁夏",
            "code": 31,
            "sub": [
                {
                    "name": "银川市",
                    "code": 467,
                    "sub": [
                        {
                            "name": "兴庆区",
                            "code": 3167
                        },
                        {
                            "name": "西夏区",
                            "code": 3168
                        },
                        {
                            "name": "金凤区",
                            "code": 3169
                        },
                        {
                            "name": "永宁县",
                            "code": 3170
                        },
                        {
                            "name": "贺兰县",
                            "code": 3171
                        },
                        {
                            "name": "灵武市",
                            "code": 3172
                        }
                    ]
                },
                {
                    "name": "石嘴山市",
                    "code": 468,
                    "sub": [
                        {
                            "name": "大武口区",
                            "code": 3173
                        },
                        {
                            "name": "惠农区",
                            "code": 3174
                        },
                        {
                            "name": "平罗县",
                            "code": 3175
                        }
                    ]
                },
                {
                    "name": "吴忠市",
                    "code": 469,
                    "sub": [
                        {
                            "name": "利通区",
                            "code": 3176
                        },
                        {
                            "name": "盐池县",
                            "code": 3177
                        },
                        {
                            "name": "同心县",
                            "code": 3178
                        },
                        {
                            "name": "青铜峡市",
                            "code": 3179
                        }
                    ]
                },
                {
                    "name": "固原市",
                    "code": 470,
                    "sub": [
                        {
                            "name": "原州区",
                            "code": 3180
                        },
                        {
                            "name": "西吉县",
                            "code": 3181
                        },
                        {
                            "name": "隆德县",
                            "code": 3182
                        },
                        {
                            "name": "泾源县",
                            "code": 3183
                        },
                        {
                            "name": "彭阳县",
                            "code": 3184
                        }
                    ]
                },
                {
                    "name": "中卫市",
                    "code": 471,
                    "sub": [
                        {
                            "name": "沙坡头区",
                            "code": 3185
                        },
                        {
                            "name": "中宁县",
                            "code": 3186
                        },
                        {
                            "name": "海原县",
                            "code": 3187
                        }
                    ]
                }
            ]
        },
        {
            "name": "新疆",
            "code": 32,
            "sub": [
                {
                    "name": "乌鲁木齐市",
                    "code": 472,
                    "sub": [
                        {
                            "name": "天山区",
                            "code": 3188
                        },
                        {
                            "name": "沙依巴克区",
                            "code": 3189
                        },
                        {
                            "name": "新市区",
                            "code": 3190
                        },
                        {
                            "name": "水磨沟区",
                            "code": 3191
                        },
                        {
                            "name": "头屯河区",
                            "code": 3192
                        },
                        {
                            "name": "达坂城区",
                            "code": 3193
                        },
                        {
                            "name": "东山区",
                            "code": 3194
                        },
                        {
                            "name": "乌鲁木齐县",
                            "code": 3195
                        }
                    ]
                },
                {
                    "name": "克拉玛依市",
                    "code": 473,
                    "sub": [
                        {
                            "name": "独山子区",
                            "code": 3196
                        },
                        {
                            "name": "克拉玛依区",
                            "code": 3197
                        },
                        {
                            "name": "白碱滩区",
                            "code": 3198
                        },
                        {
                            "name": "乌尔禾区",
                            "code": 3199
                        }
                    ]
                },
                {
                    "name": "吐鲁番地区",
                    "code": 474,
                    "sub": [
                        {
                            "name": "吐鲁番市",
                            "code": 3200
                        },
                        {
                            "name": "鄯善县",
                            "code": 3201
                        },
                        {
                            "name": "托克逊县",
                            "code": 3202
                        }
                    ]
                },
                {
                    "name": "哈密地区",
                    "code": 475,
                    "sub": [
                        {
                            "name": "哈密市",
                            "code": 3203
                        },
                        {
                            "name": "巴里坤哈萨克自治县",
                            "code": 3204
                        },
                        {
                            "name": "伊吾县",
                            "code": 3205
                        }
                    ]
                },
                {
                    "name": "昌吉州",
                    "code": 476,
                    "sub": [
                        {
                            "name": "昌吉市",
                            "code": 3206
                        },
                        {
                            "name": "阜康市",
                            "code": 3207
                        },
                        {
                            "name": "米泉市",
                            "code": 3208
                        },
                        {
                            "name": "呼图壁县",
                            "code": 3209
                        },
                        {
                            "name": "玛纳斯县",
                            "code": 3210
                        },
                        {
                            "name": "奇台县",
                            "code": 3211
                        },
                        {
                            "name": "吉木萨尔县",
                            "code": 3212
                        },
                        {
                            "name": "木垒哈萨克自治县",
                            "code": 3213
                        }
                    ]
                },
                {
                    "name": "博尔州",
                    "code": 477,
                    "sub": [
                        {
                            "name": "博乐市",
                            "code": 3214
                        },
                        {
                            "name": "精河县",
                            "code": 3215
                        },
                        {
                            "name": "温泉县",
                            "code": 3216
                        }
                    ]
                },
                {
                    "name": "巴音郭楞州",
                    "code": 478,
                    "sub": [
                        {
                            "name": "库尔勒市",
                            "code": 3217
                        },
                        {
                            "name": "轮台县",
                            "code": 3218
                        },
                        {
                            "name": "尉犁县",
                            "code": 3219
                        },
                        {
                            "name": "若羌县",
                            "code": 3220
                        },
                        {
                            "name": "且末县",
                            "code": 3221
                        },
                        {
                            "name": "焉耆回族自治县",
                            "code": 3222
                        },
                        {
                            "name": "和静县",
                            "code": 3223
                        },
                        {
                            "name": "和硕县",
                            "code": 3224
                        },
                        {
                            "name": "博湖县",
                            "code": 3225
                        }
                    ]
                },
                {
                    "name": "阿克苏地区",
                    "code": 479,
                    "sub": [
                        {
                            "name": "阿克苏市",
                            "code": 3226
                        },
                        {
                            "name": "温宿县",
                            "code": 3227
                        },
                        {
                            "name": "库车县",
                            "code": 3228
                        },
                        {
                            "name": "沙雅县",
                            "code": 3229
                        },
                        {
                            "name": "新和县",
                            "code": 3230
                        },
                        {
                            "name": "拜城县",
                            "code": 3231
                        },
                        {
                            "name": "乌什县",
                            "code": 3232
                        },
                        {
                            "name": "阿瓦提县",
                            "code": 3233
                        },
                        {
                            "name": "柯坪县",
                            "code": 3234
                        }
                    ]
                },
                {
                    "name": "克孜勒苏柯尔克孜自治州",
                    "code": 480,
                    "sub": [
                        {
                            "name": "阿图什市",
                            "code": 3235
                        },
                        {
                            "name": "阿克陶县",
                            "code": 3236
                        },
                        {
                            "name": "阿合奇县",
                            "code": 3237
                        },
                        {
                            "name": "乌恰县",
                            "code": 3238
                        }
                    ]
                },
                {
                    "name": "喀什地区",
                    "code": 481,
                    "sub": [
                        {
                            "name": "喀什市",
                            "code": 3239
                        },
                        {
                            "name": "疏附县",
                            "code": 3240
                        },
                        {
                            "name": "疏勒县",
                            "code": 3241
                        },
                        {
                            "name": "英吉沙县",
                            "code": 3242
                        },
                        {
                            "name": "泽普县",
                            "code": 3243
                        },
                        {
                            "name": "莎车县",
                            "code": 3244
                        },
                        {
                            "name": "叶城县",
                            "code": 3245
                        },
                        {
                            "name": "麦盖提县",
                            "code": 3246
                        },
                        {
                            "name": "岳普湖县",
                            "code": 3247
                        },
                        {
                            "name": "伽师县",
                            "code": 3248
                        },
                        {
                            "name": "巴楚县",
                            "code": 3249
                        },
                        {
                            "name": "塔什库尔干塔吉克自治县",
                            "code": 3250
                        }
                    ]
                },
                {
                    "name": "和田地区",
                    "code": 482,
                    "sub": [
                        {
                            "name": "和田市",
                            "code": 3251
                        },
                        {
                            "name": "和田县",
                            "code": 3252
                        },
                        {
                            "name": "墨玉县",
                            "code": 3253
                        },
                        {
                            "name": "皮山县",
                            "code": 3254
                        },
                        {
                            "name": "洛浦县",
                            "code": 3255
                        },
                        {
                            "name": "策勒县",
                            "code": 3256
                        },
                        {
                            "name": "于田县",
                            "code": 3257
                        },
                        {
                            "name": "民丰县",
                            "code": 3258
                        }
                    ]
                },
                {
                    "name": "伊犁州",
                    "code": 483,
                    "sub": [
                        {
                            "name": "伊宁市",
                            "code": 3259
                        },
                        {
                            "name": "奎屯市",
                            "code": 3260
                        },
                        {
                            "name": "伊宁县",
                            "code": 3261
                        },
                        {
                            "name": "察布查尔锡伯自治县",
                            "code": 3262
                        },
                        {
                            "name": "霍城县",
                            "code": 3263
                        },
                        {
                            "name": "巩留县",
                            "code": 3264
                        },
                        {
                            "name": "新源县",
                            "code": 3265
                        },
                        {
                            "name": "昭苏县",
                            "code": 3266
                        },
                        {
                            "name": "特克斯县",
                            "code": 3267
                        },
                        {
                            "name": "尼勒克县",
                            "code": 3268
                        }
                    ]
                },
                {
                    "name": "塔城地区",
                    "code": 484,
                    "sub": [
                        {
                            "name": "塔城市",
                            "code": 3269
                        },
                        {
                            "name": "乌苏市",
                            "code": 3270
                        },
                        {
                            "name": "额敏县",
                            "code": 3271
                        },
                        {
                            "name": "沙湾县",
                            "code": 3272
                        },
                        {
                            "name": "托里县",
                            "code": 3273
                        },
                        {
                            "name": "裕民县",
                            "code": 3274
                        },
                        {
                            "name": "和布克赛尔蒙古自治县",
                            "code": 3275
                        }
                    ]
                },
                {
                    "name": "阿勒泰地区",
                    "code": 485,
                    "sub": [
                        {
                            "name": "阿勒泰市",
                            "code": 3276
                        },
                        {
                            "name": "布尔津县",
                            "code": 3277
                        },
                        {
                            "name": "富蕴县",
                            "code": 3278
                        },
                        {
                            "name": "福海县",
                            "code": 3279
                        },
                        {
                            "name": "哈巴河县",
                            "code": 3280
                        },
                        {
                            "name": "青河县",
                            "code": 3281
                        },
                        {
                            "name": "吉木乃县",
                            "code": 3282
                        }
                    ]
                },
                {
                    "name": "石河子市",
                    "code": 486
                },
                {
                    "name": "阿拉尔市",
                    "code": 487
                },
                {
                    "name": "图木舒克市",
                    "code": 488
                },
                {
                    "name": "五家渠市",
                    "code": 489
                }
            ]
        },
        {
            "name": "台湾省",
            "code": 33,
            "sub": [
                {
                    "name": "台北市",
                    "code": 490
                },
                {
                    "name": "高雄市",
                    "code": 491
                },
                {
                    "name": "基隆市",
                    "code": 492
                },
                {
                    "name": "新竹市",
                    "code": 493
                },
                {
                    "name": "台中市",
                    "code": 494
                },
                {
                    "name": "嘉义市",
                    "code": 495
                },
                {
                    "name": "台南市",
                    "code": 496
                },
                {
                    "name": "台北县",
                    "code": 497
                },
                {
                    "name": "桃园县",
                    "code": 498
                },
                {
                    "name": "新竹县",
                    "code": 499
                },
                {
                    "name": "苗栗县",
                    "code": 500
                },
                {
                    "name": "台中县",
                    "code": 501
                },
                {
                    "name": "彰化县",
                    "code": 502
                },
                {
                    "name": "南投县",
                    "code": 503
                },
                {
                    "name": "云林县",
                    "code": 504
                },
                {
                    "name": "嘉义县",
                    "code": 505
                },
                {
                    "name": "台南县",
                    "code": 506
                },
                {
                    "name": "高雄县",
                    "code": 507
                },
                {
                    "name": "屏东县",
                    "code": 508
                },
                {
                    "name": "宜兰县",
                    "code": 509
                },
                {
                    "name": "花莲县",
                    "code": 510
                },
                {
                    "name": "台东县",
                    "code": 511
                },
                {
                    "name": "澎湖县",
                    "code": 512
                },
                {
                    "name": "金门县",
                    "code": 513
                },
                {
                    "name": "连江县",
                    "code": 514
                }
            ]
        },
        {
            "name": "香港",
            "code": 34,
            "sub": [
                {
                    "name": "中西区",
                    "code": 515
                },
                {
                    "name": "东区",
                    "code": 516
                },
                {
                    "name": "南区",
                    "code": 517
                },
                {
                    "name": "湾仔区",
                    "code": 518
                },
                {
                    "name": "九龙城区",
                    "code": 519
                },
                {
                    "name": "观塘区",
                    "code": 520
                },
                {
                    "name": "深水埗区",
                    "code": 521
                },
                {
                    "name": "黄大仙区",
                    "code": 522
                },
                {
                    "name": "油尖旺区",
                    "code": 523
                },
                {
                    "name": "离岛区",
                    "code": 524
                },
                {
                    "name": "葵青区",
                    "code": 525
                },
                {
                    "name": "北区",
                    "code": 526
                },
                {
                    "name": "西贡区",
                    "code": 527
                },
                {
                    "name": "沙田区",
                    "code": 528
                },
                {
                    "name": "大埔区",
                    "code": 529
                },
                {
                    "name": "荃湾区",
                    "code": 530
                },
                {
                    "name": "屯门区",
                    "code": 531
                },
                {
                    "name": "元朗区",
                    "code": 532
                }
            ]
        },
        {
            "name": "澳门",
            "code": 35,
            "sub": [
                {
                    "name": "花地玛堂区",
                    "code": 533
                },
                {
                    "name": "市圣安多尼堂区",
                    "code": 534
                },
                {
                    "name": "大堂区",
                    "code": 535
                },
                {
                    "name": "望德堂区",
                    "code": 536
                },
                {
                    "name": "风顺堂区",
                    "code": 537
                },
                {
                    "name": "嘉模堂区",
                    "code": 538
                },
                {
                    "name": "圣方济各堂区",
                    "code": 539
                }
            ]
        },
        {
            "name": "钓鱼岛",
            "code": 3358,
            "sub": [
                {
                    "name": "钓鱼岛",
                    "code": 3359
                }
            ]
        },
    ];


    exports('pca', pca);

});
