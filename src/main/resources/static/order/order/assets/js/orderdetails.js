(() => {
    // =========================報價分頁=========================
    const qpproductQuotationId = document.getElementById('qpproductQuotationId')
    const qporderDetailId = document.getElementById('qporderDetailId')
    const qpquotationDate = document.getElementById('qpquotationDate')
    const qpmaterialUnitPrice = document.getElementById('qpmaterialUnitPrice')
    const qpmaterialUnitPrice2 = document.getElementById('qpmaterialUnitPrice2')
    const qpgrindingPrice = document.getElementById('qpgrindingPrice')
    const qpgrindingPrice2 = document.getElementById('qpgrindingPrice2')
    const qpbreakingKnifegrindingPrice = document.getElementById('qpbreakingKnifegrindingPrice')
    const qpbreakingKnifegrindingPrice2 = document.getElementById('qpbreakingKnifegrindingPrice2')
    const qpheatTreatmentPrice = document.getElementById('qpheatTreatmentPrice')
    const qpheatTreatmentPrice2 = document.getElementById('qpheatTreatmentPrice2')
    const qpwasherProcessingPrice = document.getElementById('qpwasherProcessingPrice')
    const qpwasherProcessingPrice2 = document.getElementById('qpwasherProcessingPrice2')
    const qpbreakingKnifeProcessingPrice = document.getElementById('qpbreakingKnifeProcessingPrice')
    const qpbreakingKnifeProcessingPrice2 = document.getElementById('qpbreakingKnifeProcessingPrice2')
    const qpbreakingknifeRepairPrice = document.getElementById('qpbreakingknifeRepairPrice')
    const qpbreakingknifeRepairPrice2 = document.getElementById('qpbreakingknifeRepairPrice2')
    const qpcrushingKnifeProcessingPrice = document.getElementById('qpcrushingKnifeProcessingPrice')
    const qpcrushingKnifeProcessingPrice2 = document.getElementById('qpcrushingKnifeProcessingPrice2')
    const qptoothCount = document.getElementById('qptoothCount')
    const qpwireCuttingPrice = document.getElementById('qpwireCuttingPrice')
    const qpwireCuttingPrice2 = document.getElementById('qpwireCuttingPrice2')
    const qphezhenQuotation = document.getElementById('qphezhenQuotation')
    const qpguofengQuotation = document.getElementById('qpguofengQuotation')
    const qpguoshengQuotation = document.getElementById('qpguoshengQuotation')
    const qphuataiQuotation = document.getElementById('qphuataiQuotation')
    const qpjinjiQuotation = document.getElementById('qpjinjiQuotation')
    const qpotherQuotation = document.getElementById('qpotherQuotation')
    const qpholeMultiplier = document.getElementById('qpholeMultiplier')
    const qpholeCount = document.getElementById('qpholeCount')
    const qpholeMachiningPrice = document.getElementById('qpholeMachiningPrice')
    const qpholeMachiningPrice2 = document.getElementById('qpholeMachiningPrice2')
    const qpotherProcessingPrice = document.getElementById('qpotherProcessingPrice')
    const qptotalCost = document.getElementById('qptotalCost')
    const qptotalCost2 = document.getElementById('qptotalCost2')
    const qpgrindingthickness = document.getElementById('qpgrindingthickness')
    // const qpReferenceValue = document.getElementById('qpReferenceValue')
    const qpperimeter = document.getElementById('qpperimeter')
    const qptype = document.getElementById('qptype')
    const httype = document.getElementById('httype')
    const qpgrindingthickness2 = document.getElementById('qpgrindingthickness2')
    const qptoothCount2 = document.getElementById('qptoothCount2')

// div
    const qpmaterialUnitPricediv = document.getElementById('qpmaterialUnitPricediv')
    const qpgrindingPricediv = document.getElementById('qpgrindingPricediv')
    const qpbreakingKnifegrindingPricediv = document.getElementById('qpbreakingKnifegrindingPricediv')
    const qpheatTreatmentPricediv = document.getElementById('qpheatTreatmentPricediv')
    const qpwasherProcessingPricediv = document.getElementById('qpwasherProcessingPricediv')
    const qpbreakingKnifeProcessingPricediv = document.getElementById('qpbreakingKnifeProcessingPricediv')
    const qpbreakingknifeRepairPricediv = document.getElementById('qpbreakingknifeRepairPricediv')
    const qpcrushingKnifeProcessingPricediv = document.getElementById('qpcrushingKnifeProcessingPricediv')
    const qpwireCuttingPricediv = document.getElementById('qpwireCuttingPricediv')
    const qphezhenQuotationdiv = document.getElementById('qphezhenQuotationdiv')
    const qpguofengQuotationdiv = document.getElementById('qpguofengQuotationdiv')
    const qpguoshengQuotationdiv = document.getElementById('qpguoshengQuotationdiv')
    const qphuataiQuotationdiv = document.getElementById('qphuataiQuotationdiv')
    const qpjinjiQuotationdiv = document.getElementById('qpjinjiQuotationdiv')
    const qpholeMachiningPricediv = document.getElementById('qpholeMachiningPricediv')

    // =========================訂單分頁=========================
    const oporderId = document.getElementById('oporderId')
    const opcustomerId = document.getElementById('opcustomerId')
    const opcustomerName = document.getElementById('opcustomerName')
    const oporderDate = document.getElementById('oporderDate')
    const opdeliveryDate = document.getElementById('opdeliveryDate')
    const opquotation = document.getElementById('opquotation')
    const opnote = document.getElementById('opnote')
    const oporderState = document.getElementById('oporderState')

    // =========================產品分頁=========================
    const pporderDetailId = document.getElementById('pporderDetailId')
    const pporderId = document.getElementById('pporderId')
    const ppproductType = document.getElementById('productType')
    const pplength = document.getElementById('pplength')
    const ppwidth = document.getElementById('ppwidth')
    const ppthickness = document.getElementById('ppthickness')
    const ppproductMaterial = document.getElementById('productMaterial')
    const ppmanufacturingProcess = document.getElementById('ppmanufacturingProcess')
    const ppproductQuotationUnitPrice = document.getElementById('ppproductQuotationUnitPrice')
    const ppproductQuantity = document.getElementById('ppproductQuantity')
    const ppproductSubtotal = document.getElementById('ppproductSubtotal')
    const ppnote = document.getElementById('ppnote')
    // =========================工作明細分頁=========================

    // ============================  初始化datatable函式========================
    let dataTable = $('#all').DataTable({
        scrollCollapse: false,
        paging: true,
        pageLength: 15,
        info: false,
        destroy: true,
        dom: 'Qlfrtip',
    });

    // =========================讀取sessionstorage=========================

    const Orderdetail = sessionStorage.getItem('Orderdetail');
    const orderDetailObject = JSON.parse(Orderdetail);
    const orderDetailId = orderDetailObject.orderDetailId;
    const orderId4search = orderDetailObject.orderId;


    // ============================報價方法 ========================


    // ============================查報價資料getAll ========================

    let productQuotationData = [];

    function getproductQuotation() {
        fetch('getProductQuotationByUk', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderDetailId: orderDetailId,
            }),
        })
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('发生错误，状态码：' + response.status);
                    return;
                }
                qporderDetailId.value = orderDetailId ?? 0;
                return response.text(); // 使用.text()来获取响应体的文本内容
            })
            .then(function (data) {
                try {
                    if (data) {
                        const jsonData = JSON.parse(data);

                        productQuotationData = jsonData;
                        console.log("這是報價資料", productQuotationData);
                        const productQuotationId = productQuotationData.productQuotationId;
                        const quotationDate = dateformat(new Date(productQuotationData.quotationDate));
                        const materialUnitPrice = productQuotationData.materialUnitPrice;
                        const grindingPrice = productQuotationData.grindingPrice;
                        const breakingKnifegrindingPrice = productQuotationData.breakingKnifegrindingPrice;
                        const heatTreatmentPrice = productQuotationData.heatTreatmentPrice;
                        const washerProcessingPrice = productQuotationData.washerProcessingPrice;
                        const breakingKnifeProcessingPrice = productQuotationData.breakingKnifeProcessingPrice;
                        const breakingknifeRepairPrice = productQuotationData.breakingknifeRepairPrice;
                        const crushingKnifeProcessingPrice = productQuotationData.crushingKnifeProcessingPrice;
                        const toothCount = productQuotationData.toothCount;
                        const wireCuttingPrice = productQuotationData.wireCuttingPrice;
                        const hezhenQuotation = productQuotationData.hezhenQuotation;
                        const guofengQuotation = productQuotationData.guofengQuotation;
                        const guoshengQuotation = productQuotationData.guoshengQuotation;
                        const huataiQuotation = productQuotationData.huataiQuotation;
                        const jinjiQuotation = productQuotationData.jinjiQuotation;
                        const otherQuotation = productQuotationData.otherQuotation;
                        const holeMultiplier = productQuotationData.holeMultiplier;
                        const holeCount = productQuotationData.holeCount;
                        const holeMachiningPrice = productQuotationData.holeMachiningPrice;
                        const otherProcessingPrice = productQuotationData.otherProcessingPrice;
                        const totalCost = productQuotationData.totalCost;
                        qpproductQuotationId.value = productQuotationId ?? '';
                        qpquotationDate.value = quotationDate ?? 0;
                        qpmaterialUnitPrice.value = materialUnitPrice ?? 0;
                        qpgrindingPrice.value = grindingPrice ?? 0;
                        qpbreakingKnifegrindingPrice.value = breakingKnifegrindingPrice ?? 0;
                        qpheatTreatmentPrice.value = heatTreatmentPrice ?? 0;
                        qpwasherProcessingPrice.value = washerProcessingPrice ?? 0;
                        qpbreakingKnifeProcessingPrice.value = breakingKnifeProcessingPrice ?? 0;
                        qpbreakingknifeRepairPrice.value = breakingknifeRepairPrice ?? 0;
                        qpcrushingKnifeProcessingPrice.value = crushingKnifeProcessingPrice ?? 0;
                        qptoothCount.value = toothCount ?? 0;
                        qpwireCuttingPrice.value = wireCuttingPrice ?? 0;
                        qphezhenQuotation.value = hezhenQuotation ?? 0;
                        qpguofengQuotation.value = guofengQuotation ?? 0;
                        qpguoshengQuotation.value = guoshengQuotation ?? 0;
                        qphuataiQuotation.value = huataiQuotation ?? 0;
                        qpjinjiQuotation.value = jinjiQuotation ?? 0;
                        qpotherQuotation.value = otherQuotation ?? 0;
                        qpholeMultiplier.value = holeMultiplier ?? 0;
                        qpholeCount.value = holeCount ?? 0;
                        qpholeMachiningPrice.value = holeMachiningPrice ?? 0;
                        qpotherProcessingPrice.value = otherProcessingPrice ?? 0;
                        qptotalCost.value = totalCost ?? 0;
                        qpgrindingthickness.value = 1;
                        qpperimeter.value = 0;
                        qpgrindingthickness2.value = 1;
                        qptoothCount2.value = toothCount ?? 0;
                    } else {
                        console.log('無報價資料');
                        qpquotationDate.value = formattedDate ?? 0;
                        // 在这里处理数据不存在的情况
                    }
                } catch (error) {
                    console.log('JSON解析出错:', error);
                    // 在这里处理JSON解析错误
                }
            })
    }

    // =======================參考值=====================================
    function displaynone() {
        const elements2display = [
            // 料
            qpmaterialUnitPricediv,
            // 研磨
            qpgrindingPricediv,
            // 破碎研磨
            qpbreakingKnifegrindingPricediv,
            // 熱處理
            qpheatTreatmentPricediv,
            // 墊圈加工
            qpwasherProcessingPricediv,
            // 破碎加工
            qpbreakingKnifeProcessingPricediv,
            // 破碎悍補
            qpbreakingknifeRepairPricediv,
            // 粉碎加工
            qpcrushingKnifeProcessingPricediv,
            // 線切割
            qpwireCuttingPricediv,
            // 合振
            qphezhenQuotationdiv,
            // 國豐
            qpguofengQuotationdiv,
            // 國聖
            qpguoshengQuotationdiv,
            // 華泰
            qphuataiQuotationdiv,
            // 進佶
            qpjinjiQuotationdiv,
            // 孔加工
            qpholeMachiningPricediv,

        ];
        elements2display.forEach(element => {
            element.style.display = 'none';
        });
    }

    function displayblock(element) {
        element.forEach(e => {
            e.style.removeProperty('display'); // 删除 display: none
        });
    }


    function setReferenceValue() {
        displaynone();
        const customerindex = customerdata.customerMultiplier;
        console.log('倍率', customerindex)
        const productMaterial = ppproductMaterial.value;
        const categoryId = orderDetailObject.categoryId;
        const categorytype = productNamemap.get(categoryId);
        // 1.料價格
        // 1-1 圓形算法
        const circlesteelprice = ["破碎刀", "墊圈", "其他(圓)", "齒輪", "軸心"]
        if (circlesteelprice.includes(categorytype)) {
            // 1-1.圓形算法
            // (半徑^2*24.8*厚度)/1000000 四捨五入到小數第二位
            const length = parseFloat(pplength.value) + 10;
            const thickness = parseFloat(ppthickness.value) + 5;
            const weight = (length / 2) * (length / 2) * 24.8 * thickness / 1000000;
            const weight4c = parseFloat(weight.toFixed(1));

            for (const row of meterail) {
                const steelMaterial = row.steelMaterial;
                const steelType = row.steelType;
                const steelMinSize = row.steelMinSize;
                const steelMaxSize = row.steelMaxSize;
                const steelUnitPrice = row.steelUnitPrice;
                if (productMaterial === steelMaterial && steelType === "圓型" && length > steelMinSize && length <= steelMaxSize) {
                    qpmaterialUnitPrice2.value = (weight4c * steelUnitPrice).toFixed(2).toString();
                    break;
                } else {
                    qpmaterialUnitPrice2.value = "查無資料";
                }
            }
            const element = [
                qpmaterialUnitPricediv
            ]
            displayblock(element);

        }
        if (categorytype === "粉碎刀" || categorytype === "清潔指板" || categorytype === "其他(方)" || categorytype === "破碎刀(方)") {
            // 1-2.方型算法
            const length = parseFloat(pplength.value) + 5;
            const width = parseFloat(ppwidth.value) + 5;
            const thickness = parseFloat(ppthickness.value) + 5;
            const weight = parseFloat((length * width * thickness * 8 / 1000000).toFixed(1));
            for (let i = 0; i < meterail.length; i++) {
                const row = meterail[i];
                const steelMaterial = row.steelMaterial;
                const steelType = row.steelType;
                const steelMinSize = row.steelMinSize;
                const steelMaxSize = row.steelMaxSize;
                let steelUnitPrice = row.steelUnitPrice;

                if (steelType === "方型" && productMaterial === steelMaterial && thickness > steelMinSize && thickness <= steelMaxSize) {
                    if (width <= 100 && length >= 300 && length < 1000) {
                        steelUnitPrice = steelUnitPrice + 3;
                    }
                    if (width <= 100 && length >= 1000) {
                        steelUnitPrice = steelUnitPrice + 5;
                    }
                    qpmaterialUnitPrice2.value = (weight * steelUnitPrice).toFixed(2).toString();
                    break; // 在這裡使用 break
                } else {
                    qpmaterialUnitPrice2.value = "查無資料";
                }
            }

            const element = [
                qpmaterialUnitPricediv
            ]
            displayblock(element);
        }
        //
        // 2.研磨價格
        //    2-1 圓形算法
        const grindingthickness = qpgrindingthickness.value;

        if (categorytype === "墊圈" || categorytype === "其他(圓)") {
            const length = parseFloat(pplength.value) + 10;
            qpgrindingPrice2.value = (length * length * 2 / 645 * grindingthickness).toFixed(2).toString();
            const element = [
                qpgrindingPricediv,
            ]
            displayblock(element);
        }
        //    2-2 方形算法
        if (categorytype === "粉碎刀" || categorytype === "其他(方)" || categorytype === "清潔指板") {
            const length = parseFloat(pplength.value) + 5;
            qpgrindingPrice2.value = (length / 25.4 * 12 * 1.3).toFixed(2).toString();
            const element = [
                qpgrindingPricediv,
            ]
            displayblock(element);
        }


        // 3.破碎刀研磨價格
        if (categorytype === "破碎刀" || categorytype === "破碎刀悍補") {
            const length = parseFloat(pplength.value) + 10;
            for (const row of grindingPrice) {
                const grindingType = row.grindingType;
                const grindingMinSize = row.grindingMinSize;
                const grindingMaxSize = row.grindingMaxSize;
                const grindingUnitPrice = row.grindingUnitPrice;
                const grindingthickness = qpgrindingthickness2.value;
                if (qptype.value === grindingType && length > grindingMinSize && length <= grindingMaxSize) {
                    qpbreakingKnifegrindingPrice2.value = grindingUnitPrice * grindingthickness;
                    break;
                } else {
                    qpbreakingKnifegrindingPrice2.value = "查無資料";
                }
            }
            const element = [
                qpbreakingKnifegrindingPricediv,
            ]
            displayblock(element);
        }

        // 4.熱處理
        // 4-1 圓形
        if (categorytype === "破碎刀" || categorytype === "墊圈" || categorytype === "其他(圓)" || categorytype === "齒輪" || categorytype === "軸心") {
            const length = parseFloat(pplength.value) + 10;
            const width = parseFloat(ppwidth.value);
            const thickness = parseFloat(ppthickness.value) + 5;
            const finalproductweight = ((((length / 2) * (length / 2) * 24.8 * thickness) - ((width / 2) * (width / 2) * 24.8 * thickness)) / 1000000);
            for (const row of heatTreatmentPriceData) {
                const heatTreatmentMaterial = row.heatTreatmentMaterial;
                const heatTreatmentUnitPrice = row.heatTreatmentUnitPrice;
                if (httype.value === heatTreatmentMaterial) {
                    qpheatTreatmentPrice2.value = (heatTreatmentUnitPrice * finalproductweight).toFixed(2).toString();
                    break;
                } else {
                    qpheatTreatmentPrice2.value = "查無資料";
                }
            }
            const element = [
                qpheatTreatmentPricediv,
            ]
            displayblock(element);

        }
        // 4-2 方形

        if (categorytype === "粉碎刀" || categorytype === "其他(方)") {
            const length = parseFloat(pplength.value) + 5;
            const width = parseFloat(ppwidth.value) + 5;
            const thickness = parseFloat(ppthickness.value) + 5;
            const finalproductweight = (length * width * thickness * 8 / 1000000) * 0.9;

            for (const row of heatTreatmentPriceData) {
                const heatTreatmentMaterial = row.heatTreatmentMaterial;
                const heatTreatmentUnitPrice = row.heatTreatmentUnitPrice;
                if (httype.value === heatTreatmentMaterial) {
                    console.log("單價", heatTreatmentUnitPrice)
                    qpheatTreatmentPrice2.value = heatTreatmentUnitPrice * finalproductweight;
                    break;
                } else {
                    qpheatTreatmentPrice2.value = "查無資料";
                }
            }
            const element = [
                qpheatTreatmentPricediv,
            ]
            displayblock(element);

        }
        // 5.墊圈加工價格

        if (categorytype === "墊圈") {
            const length = parseFloat(pplength.value) + 10;
            const thickness = parseFloat(ppthickness.value) + 5;
            qpwasherProcessingPrice2.value = (length * thickness / 15).toFixed(2).toString();
            const element = [
                qpwasherProcessingPricediv,
            ]
            displayblock(element);
        }

        // 6.破碎刀加工價格
        if (categorytype === "破碎刀") {
            const length = parseFloat(pplength.value) + 10;
            const thickness = parseFloat(ppthickness.value) + 5;
            for (const row of toothCountPriceData) {
                const toothMinThickness = row.toothMinThickness;
                const toothMaxThickness = row.toothMaxThickness;
                const toothUnitPrice = row.toothUnitPrice;
                const toothCount = qptoothCount.value - 3;
                if (thickness > toothMinThickness && thickness <= toothMaxThickness) {
                    if (toothCount <= 0) {
                        qpbreakingKnifeProcessingPrice2.value = (length * thickness / 8).toFixed(2).toString();
                        break;
                    } else {
                        qpbreakingKnifeProcessingPrice2.value = ((length * thickness / 8) + (toothUnitPrice * toothCount)).toFixed(2).toString();
                        break;
                    }
                } else {
                    qpbreakingKnifeProcessingPrice2.value = "查無資料";
                }
            }
            const element = [
                qpbreakingKnifeProcessingPricediv,
            ]
            displayblock(element);
        }
        // 7.破碎刀悍補價格
        if (categorytype === "破碎刀悍補") {
            const length = parseFloat(pplength.value) + 10;
            const toothCount = qptoothCount2.value - 3;
            if (toothCount <= 0) {
                qpbreakingknifeRepairPrice2.value = (length / 25.4 * 270).toFixed(2).toString();
            } else {
                qpbreakingknifeRepairPrice2.value = ((length / 25.4 * 270) + (toothCount * 300)).toFixed(2).toString();
            }
            const element = [
                qpbreakingknifeRepairPricediv,
            ]
            displayblock(element);
        }

        // 8.粉碎刀加工價格
        if (categorytype === "粉碎刀") {
            const length = parseFloat(pplength.value) + 5;
            const width = parseFloat(ppwidth.value) + 5;
            const thickness = parseFloat(ppthickness.value) + 5;
            qpcrushingKnifeProcessingPrice2.value = (length * width * thickness / 2260 * 1.3).toFixed(2).toString();
            const element = [
                qpcrushingKnifeProcessingPricediv,
            ]
            displayblock(element);
        }

        // 9.線切割加工價格
        if (categorytype === "破碎刀" || categorytype === "墊圈" || categorytype === "其他(圓)" || categorytype === "齒輪" || categorytype === "粉碎刀" || categorytype === "其他(方)") {

            let thickness = parseFloat(ppthickness.value);
            const perimeter = parseFloat(qpperimeter.value);
            if (perimeter === 0) {
                qpwireCuttingPrice2.value = 0;
            } else {
                if (thickness <= 20) {
                    thickness = 20;
                }
                qpwireCuttingPrice2.value = ((thickness * perimeter / 50 * 5) + (30 * 6.9)).toFixed(2).toString();
            }
            const element = [
                qpwireCuttingPricediv,
            ]
            displayblock(element);

        }


        // 10.孔加工價格
        if (categorytype === "墊圈" || categorytype === "其他(圓)" || categorytype === "齒輪" || categorytype === "粉碎刀" || categorytype === "其他(方)" || categorytype === "軸心" || categorytype === "清潔指板") {
            const holeMultiplier = parseFloat(qpholeMultiplier.value);
            const holeCount = parseFloat(qpholeCount.value);
            qpholeMachiningPrice2.value = 35 * (holeMultiplier * 0.01 + 1) * holeCount;

            const element = [
                qpholeMachiningPricediv
            ]
            displayblock(element);
        }


        // 11.總金額

        // 11-1 破碎刀
        if (categorytype === "破碎刀") {
            // 總金額
            qptotalCost2.value = (

                // 材料
                parseFloat(qpmaterialUnitPrice.value) +
                // 破碎刀研磨
                parseFloat(qpbreakingKnifegrindingPrice.value) +
                // 熱處理
                parseFloat(qpheatTreatmentPrice.value) +
                // 破碎刀加工
                parseFloat(qpbreakingKnifeProcessingPrice.value) +
                // 線切割
                parseFloat(qpwireCuttingPrice.value) +
                // 其他報價
                parseFloat(qpotherQuotation.value) +
                // 其他加工
                parseFloat(qpotherProcessingPrice.value)) * customerindex
            ;
        }

        // 11-2 破碎刀悍補
        if (categorytype === "破碎刀悍補") {
            // 總金額
            qptotalCost2.value = (
                // 破碎刀研磨
                parseFloat(qpbreakingKnifegrindingPrice.value) +
                // 破碎刀悍補
                parseFloat(qpbreakingknifeRepairPrice.value) +
                // 其他報價
                parseFloat(qpotherQuotation.value) +
                // 其他加工
                parseFloat(qpotherProcessingPrice.value)) * customerindex;
        }
        // 11-3 墊圈
        if (categorytype === "墊圈") {
            // 總金額
            qptotalCost2.value = (
                // 材料
                parseFloat(qpmaterialUnitPrice.value) +
                // 研磨
                parseFloat(qpgrindingPrice.value) +
                // 熱處理
                parseFloat(qpheatTreatmentPrice.value) +
                // 墊圈加工
                parseFloat(qpwasherProcessingPrice.value) +
                // 線切割
                parseFloat(qpwireCuttingPrice.value) +
                // 合振
                parseFloat(qphezhenQuotation.value) +
                // 孔加工
                parseFloat(qpholeMachiningPrice.value) +
                // 其他報價
                parseFloat(qpotherQuotation.value) +
                // 其他加工
                parseFloat(qpotherProcessingPrice.value)) * customerindex;
            const element = [
                // 合振
                qphezhenQuotationdiv,
            ]
            displayblock(element);
        }
        // 11-4 其他(圓)
        if (categorytype === "其他(圓)") {
            // 總金額
            qptotalCost2.value = (
                // 材料
                parseFloat(qpmaterialUnitPrice.value) +
                // 研磨
                parseFloat(qpgrindingPrice.value) +
                // 熱處理
                parseFloat(qpheatTreatmentPrice.value) +
                // 墊圈加工
                parseFloat(qpwasherProcessingPrice.value) +
                // 線切割
                parseFloat(qpwireCuttingPrice.value) +
                // 合振
                parseFloat(qphezhenQuotation.value) +
                // 其他報價
                parseFloat(qpotherQuotation.value) +
                // 孔加工
                parseFloat(qpholeMachiningPrice.value) +
                // 其他加工
                parseFloat(qpotherProcessingPrice.value)) * customerindex;
            const element = [
                // 合振
                qphezhenQuotationdiv,
            ]
            displayblock(element);

        }
        // 11-5 齒輪
        if (categorytype === "齒輪") {
            // 總金額
            qptotalCost2.value = (
                // 材料
                parseFloat(qpmaterialUnitPrice.value) +
                // 熱處理
                parseFloat(qpheatTreatmentPrice.value) +
                // 線切割
                parseFloat(qpwireCuttingPrice.value) +
                // 合振
                parseFloat(qphezhenQuotation.value) +
                // 國豐
                parseFloat(qpguofengQuotation.value) +
                // 國聖
                parseFloat(qpguoshengQuotation.value) +
                // 其他報價
                parseFloat(qpotherQuotation.value) +
                // 孔加工
                parseFloat(qpholeMachiningPrice.value) +
                // 其他加工
                parseFloat(qpotherProcessingPrice.value)) * customerindex;
            const element = [
                // 合振
                qphezhenQuotationdiv,
                // 國豐
                qpguofengQuotationdiv,
                // 國聖
                qpguoshengQuotationdiv,
            ]
            displayblock(element);

        }
        // 11-6 軸心
        if (categorytype === "軸心") {
            // 總金額
            qptotalCost2.value = (
                // 材料
                parseFloat(qpmaterialUnitPrice.value) +
                // 熱處理
                parseFloat(qpheatTreatmentPrice.value) +
                // 合振
                parseFloat(qphezhenQuotation.value) +
                // 國聖
                parseFloat(qpguoshengQuotation.value) +
                // 華泰
                parseFloat(qphuataiQuotation.value) +
                // 進佶
                parseFloat(qpjinjiQuotation.value) +
                // 其他報價
                parseFloat(qpotherQuotation.value) +
                // 孔加工
                parseFloat(qpholeMachiningPrice.value) +
                // 其他加工
                parseFloat(qpotherProcessingPrice.value)) * customerindex;
            const element = [
                // 合振
                qphezhenQuotationdiv,
                // 國聖
                qpguoshengQuotationdiv,
                // 華泰
                qphuataiQuotationdiv,
                // 進佶
                qpjinjiQuotationdiv,
            ]
            displayblock(element);

        }
        // 11-7 粉碎刀
        if (categorytype === "粉碎刀") {
            // 總金額
            qptotalCost2.value = (
                // 材料
                parseFloat(qpmaterialUnitPrice.value) +
                // 研磨
                parseFloat(qpgrindingPrice.value) +
                // 熱處理
                parseFloat(qpheatTreatmentPrice.value) +
                // 粉碎刀加工
                parseFloat(qpcrushingKnifeProcessingPrice.value) +
                // 線切割
                parseFloat(qpwireCuttingPrice.value) +
                // 其他報價
                parseFloat(qpotherQuotation.value) +
                // 孔加工
                parseFloat(qpholeMachiningPrice.value) +
                // 其他加工
                parseFloat(qpotherProcessingPrice.value)) * customerindex;
        }
        //11-8 其他(方)
        if (categorytype === "其他(方)") {
            // 總金額
            qptotalCost2.value = (
                // 材料
                parseFloat(qpmaterialUnitPrice.value) +
                // 研磨
                parseFloat(qpgrindingPrice.value) +
                // 熱處理
                parseFloat(qpheatTreatmentPrice.value) +
                // 線切割
                parseFloat(qpwireCuttingPrice.value) +
                // 其他報價
                parseFloat(qpotherQuotation.value) +
                // 孔加工
                parseFloat(qpholeMachiningPrice.value) +
                // 其他加工
                parseFloat(qpotherProcessingPrice.value)) * customerindex;
        }
        // 11-9 清潔指板
        if (categorytype === "清潔指板") {
            // 總金額
            qptotalCost2.value = (
                // 材料
                parseFloat(qpmaterialUnitPrice.value) +
                // 研磨
                parseFloat(qpgrindingPrice.value) +
                // 線切割
                parseFloat(qpwireCuttingPrice.value) +
                // 其他報價
                parseFloat(qpotherQuotation.value) +
                // 孔加工
                parseFloat(qpholeMachiningPrice.value) +
                // 其他加工
                parseFloat(qpotherProcessingPrice.value)) * customerindex;
        }
    }


    // 動態計算
    function setautoReferenceValue() {
        const elementsToWatch = [
            qpholeMultiplier,
            qpholeCount,
            qpholeMachiningPrice,
            qpmaterialUnitPrice,
            qpgrindingPrice,
            qpbreakingKnifegrindingPrice,
            qpheatTreatmentPrice,
            qpwasherProcessingPrice,
            qpbreakingKnifeProcessingPrice,
            qpbreakingknifeRepairPrice,
            qpcrushingKnifeProcessingPrice,
            qptoothCount,
            qpwireCuttingPrice,
            qphezhenQuotation,
            qpguofengQuotation,
            qpguoshengQuotation,
            qphuataiQuotation,
            qpjinjiQuotation,
            qpotherQuotation,
            qpgrindingthickness,
            qpperimeter,
            qptype,
            httype,
            qpotherProcessingPrice,
        ];

        elementsToWatch.forEach(element => {
            element.addEventListener('change', setReferenceValue);
        });
    }


    // ============================ 修改資料進去 edit()========================
    // 報價表修改

    function editproductQuotation() {
        const qpproductQuotationId = document.getElementById('qpproductQuotationId').value;
        const qporderDetailId = document.getElementById('qporderDetailId').value;
        const quotationDate = document.getElementById('qpquotationDate2').value;
        const qpmaterialUnitPrice = document.getElementById('qpmaterialUnitPrice').value;
        const qpgrindingPrice = document.getElementById('qpgrindingPrice').value;
        const qpbreakingKnifegrindingPricee = document.getElementById('qpbreakingKnifegrindingPrice').value;
        const qpheatTreatmentPrice = document.getElementById('qpheatTreatmentPrice').value;
        const qpwasherProcessingPrice = document.getElementById('qpwasherProcessingPrice').value;
        const qpbreakingKnifeProcessingPrice = document.getElementById('qpbreakingKnifeProcessingPrice').value;
        const qpcrushingKnifeProcessingPrice = document.getElementById('qpcrushingKnifeProcessingPrice').value;
        const qptoothCount = document.getElementById('qptoothCount').value;
        const qpwireCuttingPrice = document.getElementById('qpwireCuttingPrice').value;
        const qphezhenQuotation = document.getElementById('qphezhenQuotation').value;
        const qpguofengQuotation = document.getElementById('qpguofengQuotation').value;
        const qpguoshengQuotation = document.getElementById('qpguoshengQuotation').value;
        const qphuataiQuotation = document.getElementById('qphuataiQuotation').value;
        const qpjinjiQuotation = document.getElementById('qpjinjiQuotation').value;
        const qpotherQuotation = document.getElementById('qpotherQuotation').value;
        const qpholeMultiplier = document.getElementById('qpholeMultiplier').value;
        const qpholeCount = document.getElementById('qpholeCount').value;
        const qpholeMachiningPrice = document.getElementById('qpholeMachiningPrice').value;
        const qpotherProcessingPrice = document.getElementById('qpotherProcessingPrice').value;
        const qptotalCost = document.getElementById('qptotalCost').value;

        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editProductQuotation', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                productQuotationId: qpproductQuotationId,
                orderDetailId: qporderDetailId,
                quotationDate: quotationDate,
                materialUnitPrice: qpmaterialUnitPrice,
                grindingPrice: qpgrindingPrice,
                breakingKnifegrindingPrice: qpbreakingKnifegrindingPricee,
                heatTreatmentPrice: qpheatTreatmentPrice,
                washerProcessingPrice: qpwasherProcessingPrice,
                breakingKnifeProcessingPrice: qpbreakingKnifeProcessingPrice,
                crushingKnifeProcessingPrice: qpcrushingKnifeProcessingPrice,
                toothCount: qptoothCount,
                wireCuttingPrice: qpwireCuttingPrice,
                hezhenQuotation: qphezhenQuotation,
                guofengQuotation: qpguofengQuotation,
                guoshengQuotation: qpguoshengQuotation,
                huataiQuotation: qphuataiQuotation,
                jinjiQuotation: qpjinjiQuotation,
                otherQuotation: qpotherQuotation,
                holeMultiplier: qpholeMultiplier,
                holeCount: qpholeCount,
                holeMachiningPrice: qpholeMachiningPrice,
                otherProcessingPrice: qpotherProcessingPrice,
                totalCost: qptotalCost,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful, message} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: `${message}`, showConfirmButton: false, timer: 1500
                    }).then(() => {
                        location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: '修改失敗!', footer: '<a href=""></a>'
                    })
                }
            });

    }

// 訂單資訊修改
    function editOrderquotation() {
        const orderId = orderDetailObject.orderId;
        const qptotalCost = document.getElementById('qptotalCost').value;


        fetch('editOrder', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderId: orderId,
                quotation: qptotalCost,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful, message} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: `${message}`, showConfirmButton: false, timer: 1500
                    }).then(() => {
                        location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: '修改失敗!', footer: '<a href=""></a>'
                    })
                }
            });

    }

//
    // ============================ 抓取’修改‘按鈕 並綁定事件 ========================
    function setqpeditbutton() {
        const editbuttons = document.getElementById('qpconfirmbtn');
        editbuttons?.addEventListener('click', () => {
            console.log('修改按鈕啟動')
            editproductQuotation();
            editOrderquotation();
        })
    }

    // ============================ 日期預設 ========================

    // 获取今天的日期
    const today = new Date();

    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

// 获取日期的年、月和日
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 加1是因为月份从0开始
    const day = String(today.getDate()).padStart(2, '0');

    const year2 = nextWeek.getFullYear();
    const month2 = String(nextWeek.getMonth() + 1).padStart(2, '0'); // 加1是因为月份从0开始
    const day2 = String(nextWeek.getDate()).padStart(2, '0');

// 格式化成 YYYY-MM-DD
    const formattedDate = `${year}-${month}-${day}`;
    const formattedDate2 = `${year2}-${month2}-${day2}`;

// 设置日期输入字段的值为今天/下週
    const orderDate4new = $('#qpquotationDate2');

    orderDate4new.val(formattedDate);

    // ===============================日期轉換 從查詢資料轉換成顯示資料====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    // ===============================訂單方法=================================
    // ===============================查詢=================================


    let orderdata = [];

    function getorderdata() {
        fetch('getOrderbyorderId', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderId: orderId4search,
            }),
        })
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    orderdata = data;
                    console.log("這是訂單資料", orderdata);
                    const OrderId = orderdata.orderId;
                    const customerId = orderdata.customerId;
                    const customerName = orderdata.customerName;
                    const orderDate = dateformat(new Date(orderdata.orderDate));
                    const deliveryDate = dateformat(new Date(orderdata.deliveryDate));
                    const quotation = orderdata.quotation;
                    const note = orderdata.note;
                    const orderState = orderdata.orderState;
                    if (orderState === 0) {
                        oporderState.value = '未完成';
                    } else {
                        oporderState.value = '已完成';
                    }

                    oporderId.value = OrderId;
                    opcustomerId.value = customerId;
                    opcustomerName.value = customerName;
                    oporderDate.value = orderDate;
                    opdeliveryDate.value = deliveryDate;
                    opquotation.value = quotation;
                    opnote.value = note;

                    getcustomerdata(customerId);
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    // ============================ 修改資料進去 editOrder()========================
    function editopOrder() {
        const oporderId = orderDetailObject.orderId;
        console.log('訂單編號', oporderId);
        const oporderDate = document.getElementById(`oporderDate`).value;
        const opdeliveryDate = document.getElementById(`opdeliveryDate`).value;
        const opnote = document.getElementById(`opnote`).value;

        fetch('editOrder', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderId: oporderId,
                orderDate: oporderDate,
                deliveryDate: opdeliveryDate,
                note: opnote,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: '修改成功!', showConfirmButton: false, timer: 1500
                    }).then(() => {
                        location.reload()
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: '修改失敗!', footer: '<a href=""></a>'
                    })
                }
            });

    }

//
    // ============================ 抓取所有修改的燈箱’修改‘按鈕 並綁定事件 ========================

    function setopeditbutton() {
        const editbuttons = document.getElementById('opconfirmbtn');
        editbuttons?.addEventListener('click', () => {
            editopOrder();
        })
    }

// ============================客戶資料方法=============================

    let customerdata = [];

    function getcustomerdata(customerId) {
        fetch('getCustomerDetail', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                customeruk: customerId,
            }),
        })
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    customerdata = data;
                    setReferenceValue();

                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

// ============================產品資料方法=============================

// ============================找熱處理=============================
    getHeatTreatmentPrice()
    let heatTreatmentPriceData = [];

    function getHeatTreatmentPrice() {
        fetch("getAllHeatTreatmentPrice")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    heatTreatmentPriceData = data;

                    getcategory();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

// ============================找種類=============================
    let category = [];
    let categoryNamemap = new Map();
    let productNamemap = new Map();
    let productTypemap = new Map();
    let productTypemap2 = new Map();
    let productDefaultProcessmap = new Map();


    function getcategory() {
        fetch("getAllProductCategory")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    category = data;
                    console.log("這是種類", data);
                    for (let i = 0; i < category.length; i++) {
                        let row = category[i];
                        const categoryId = row.categoryId;
                        const categoryName = row.categoryName;
                        const productName = row.productName;
                        const productType = row.productType;
                        const productDefaultProcess = row.productDefaultProcess;
                        categoryNamemap.set(categoryId, categoryName);
                        productNamemap.set(categoryId, productName);
                        productTypemap.set(categoryId, productType);
                        productTypemap2.set(productType, categoryId);
                        productDefaultProcessmap.set(categoryId, productDefaultProcess);
                    }
                    storage2input();
                    getorderdata();
                    getproductQuotation();
                    getgrindingPrice();
                    getmeterail();
                    getEmployee();
                    getWorkRecord();
                    getOrderDetail();
                });

            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ===============================找材質===================================
    let meterail = [];
    let meterailmap = new Map();


    function getmeterail() {
        fetch("getAllSteelPrice")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    meterail = data;
                    console.log("這是材質", data);
                    for (let i = 0; i < meterail.length; i++) {
                        let row = meterail[i];
                        const steelId = row.steelId;
                        const steelMaterial = row.steelMaterial;
                        const steelMinSize = row.steelMinSize;
                        const steelMaxSize = row.steelMaxSize;
                        const steelType = row.steelType;
                        const steelUnitPrice = row.steelUnitPrice;
                        meterailmap.set(steelId, steelUnitPrice);
                    }
                    ;
                    select4edit();
                    selected4edit();
                    setqpeditbutton();
                    // setReferenceValue();
                    setautoReferenceValue();
                    setopeditbutton();
                    setppeditbutton();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    //自動選好修改內的select
    function selected4edit() {
        const categoryNameselect = $(`#categoryName`);
        const productNameselect = $(`#productName`);
        const productTypeselect = $(`#productType`);
        const productMaterialselect = $(`#productMaterial`);
        const httype = $(`#httype`);
        const productMaterial = orderDetailObject.productMaterial;
        const categoryId = orderDetailObject.categoryId;
        const categoryName = categoryNamemap.get(categoryId);
        const productName = productNamemap.get(categoryId);
        const productType = productTypemap.get(categoryId);
        categoryNameselect.val(categoryName).trigger('change.select2');
        productNameselect.val(productName).trigger('change.select2');
        productTypeselect.val(productType).trigger('change.select2');
        productMaterialselect.val(productMaterial).trigger('change.select2');
        httype.val(productMaterial).trigger('change.select2');
    }

    function select4edit() {
        //修改的select清空
        const productNamediv = $('#productNamediv')
        const productTypediv = $('#productTypediv')
        const categoryName = $('#categoryName');
        const productMaterial = $('#productMaterial');
        const productName = $('#productName');
        const productType = $('#productType');
        const httype = $('#httype');

        categoryName.empty();
        productMaterial.empty();
        httype.empty();

        //種類名稱select動態放入
        const htttype = new Set();
        htttype.add('請選擇');
        heatTreatmentPriceData.forEach(function (row) {
            const heatTreatmentMaterial = row.heatTreatmentMaterial;
            htttype.add(heatTreatmentMaterial);
        })
        htttype.forEach(function (row) {
            const option = new Option(row, row);
            httype.append(option);
        })

        // httype.select2();

        //種類名稱select動態放入
        const uniqueCategoryNames = new Set();
        uniqueCategoryNames.add('請選擇');
        category.forEach(function (row) {
            const categoryName = row.categoryName;
            uniqueCategoryNames.add(categoryName);
        })
        uniqueCategoryNames.forEach(function (row) {
            const option = new Option(row, row);
            categoryName.append(option);
        })

        categoryName.select2();

        //產品名稱select動態放入
        const uniqueproductNames = new Set();
        uniqueproductNames.add('請選擇');
        category.forEach(function (row) {
            const productName = row.productName;
            uniqueproductNames.add(productName);
        })
        uniqueproductNames.forEach(function (row) {
            const option = new Option(row, row);
            productName.append(option);
        })
        productName.select2();

        //產品形式select動態放入
        const uniqueproductTypes = new Set();
        uniqueproductTypes.add('請選擇');
        category.forEach(function (row) {
            const productType = row.productType;
            uniqueproductTypes.add(productType);
        })
        uniqueproductTypes.forEach(function (row) {
            const option = new Option(row, row);
            productType.append(option);
        })
        productType.select2();

        //材質select動態放入
        const uniquesteelMaterial = new Set();
        console.log(meterail)
        meterail.forEach(function (row) {
            const steelMaterial = row.steelMaterial;
            uniquesteelMaterial.add(steelMaterial);
        })
        uniquesteelMaterial.forEach(function (row) {
            const option = new Option(row, row);
            productMaterial.append(option);
        })
        console.log(uniquesteelMaterial)
        productMaterial.select2();

        // 監聽種類名稱選擇事件
        categoryName.on('change', function () {
            productNamediv.css('display', '');
            productTypediv.css('display', 'none');
            const optiond = new Option('請選擇', '');
            productName.empty();
            productName.append(optiond);
            const selectedValue = categoryName.val();
            const uniquesteelMaterial = new Set();
            category.forEach(function (row) {
                const categoryName = row.categoryName;
                const productName = row.productName;
                if (categoryName === selectedValue) {
                    uniquesteelMaterial.add(productName);
                }
            })
            uniquesteelMaterial.forEach(function (row) {
                const option = new Option(row, row);
                productName.append(option);
            })
            productName.select2();
        });
        // 監聽產品名稱選擇事件
        productName.on('change', function () {
            productTypediv.css('display', '');
            productType.empty();
            const optiond = new Option('請選擇', '');
            productType.append(optiond);
            const selectedValue = productName.val();
            const selectedCategoryValue = categoryName.val();
            category.forEach(function (row) {
                const productName = row.productName;
                const productType1 = row.productType;
                const categoryName = row.categoryName;
                if (categoryName === selectedCategoryValue && productName === selectedValue) {
                    const option = new Option(productType1, productType1);
                    productType.append(option);
                }
            })
            productType.select2();
        });
    }


    // ===================產品明細資料填入==========================

    // ===============================找研磨===================================
    let grindingPrice = [];


    function getgrindingPrice() {
        fetch("getAllGrindingPrice")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    grindingPrice = data;
                    console.log("這是研磨價格", data);
                    ;
                    gettoothCountPrice();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ===============================找爪數===================================

    let toothCountPriceData = [];

    function gettoothCountPrice() {
        fetch("getAllToothCountPrice")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    toothCountPriceData = data;
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    function storage2input() {

        const orderId = orderDetailObject.orderId;
        // const categoryId = orderDetailObject.categoryId;
        // const categorytype = productTypemap.get(categoryId);
        const length = orderDetailObject.length;
        const width = orderDetailObject.width;
        const thickness = orderDetailObject.thickness;
        // const productMaterial = orderDetailObject.productMaterial;
        const manufacturingProcess = orderDetailObject.manufacturingProcess;
        const productQuotationUnitPrice = orderDetailObject.productQuotationUnitPrice;
        const productQuantity = orderDetailObject.productQuantity;
        const productSubtotal = orderDetailObject.productSubtotal;
        const note = orderDetailObject.note;


        pporderDetailId.value = orderDetailId ?? 0;
        pporderId.value = orderId ?? 0;
        // ppcategoryId.value = categorytype ?? 0;
        pplength.value = length ?? 0;
        ppwidth.value = width ?? 0;
        ppthickness.value = thickness ?? 0;
        // ppproductMaterial.value = productMaterial ?? 0;
        ppmanufacturingProcess.value = manufacturingProcess ?? 0;
        ppproductQuotationUnitPrice.value = productQuotationUnitPrice ?? 0;
        ppproductQuantity.value = productQuantity ?? 0;
        ppproductSubtotal.value = productSubtotal ?? 0;
        ppnote.value = note ?? 0;

        const tital4product = document.getElementById('tital4product');
        tital4product.textContent = orderDetailObject.customerName + "  " + orderDetailObject.length + " ＊ " + orderDetailObject.width + " ＊ " + orderDetailObject.thickness;


    }

    // ============================ 修改資料進去 editOrder()========================
    function editppOrder() {
        const orderDetailId = pporderDetailId.value;
        const OrderId = pporderId.value;
        const productType = ppproductType.value;
        const categoryId = productTypemap2.get(productType);
        console.log(categoryId)
        const length = pplength.value;
        const width = ppwidth.value;
        const thickness = ppthickness.value;
        const productMaterial = ppproductMaterial.value;
        const manufacturingProcess = ppmanufacturingProcess.value;
        const productQuotationUnitPrice = ppproductQuotationUnitPrice.value;
        const productQuantity = ppproductQuantity.value;
        const productSubtotal = ppproductSubtotal.value;
        const note = ppnote.value;

        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editOrderDetail', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                orderDetailId: orderDetailId,
                orderId: OrderId,
                categoryId: categoryId,
                length: length,
                width: width,
                thickness: thickness,
                productMaterial: productMaterial,
                manufacturingProcess: manufacturingProcess,
                productQuotationUnitPrice: productQuotationUnitPrice,
                productQuantity: productQuantity,
                productSubtotal: productSubtotal,
                note: note,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: '修改成功!', showConfirmButton: false, timer: 1500
                    }).then(() => {
                        sessionStorage.setItem('Orderdetail', JSON.stringify(body));
                        location.reload();
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: '修改失敗!', footer: '<a href=""></a>'
                    })
                }
            });

    }

//
    // ============================ 抓取’修改‘按鈕 並綁定事件 ========================

    function setppeditbutton() {
        const editbuttons = document.getElementById('ppconfirmbtn');
        editbuttons?.addEventListener('click', () => {
            editppOrder();
        })
    }


    // ===================工作報表填入==========================
    let EmployeeData = [];
    let EmployeeNamemap = new Map();

    function getEmployee() {
        fetch("getAllEmployee")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    EmployeeData = data;
                    console.log("這是員工資料", EmployeeData);
                    for (let i = 0; i < EmployeeData.length; i++) {
                        let row = EmployeeData[i];
                        const employeeId = row.employeeId;
                        const employeeName = row.employeeName;
                        EmployeeNamemap.set(employeeId,employeeName)
                    }
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    let WorkRecordData = [];
    let  WorkRecordmap = new Map();

    function getWorkRecord() {
        fetch("getAllWorkRecord")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    WorkRecordData = data;
                    console.log("這是工作報表資料", WorkRecordData);
                    for (let i = 0; i < WorkRecordData.length; i++) {
                        let row = WorkRecordData[i];
                        const workRecordId = row.workRecordId;
                        const employeeId = row.employeeId;
                        WorkRecordmap.set(workRecordId,employeeId)
                    }
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    let OrderDetailData = [];

    function getOrderDetail() {
        fetch("getAllOrderDetail")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    OrderDetailData = data;
                    console.log("這是訂單明細資料", OrderDetailData);
                    getWorkDetail();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    let WorkDetailData = [];

    function getWorkDetail() {
        fetch("getWorkDetailByOrderDetailId", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderDetailId),
        })


            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }

                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    WorkDetailData = data;
                    console.log("這是工作報表資料", WorkDetailData);
                    dataaccount = WorkDetailData.length;
                    for (let i = 0; i < WorkDetailData.length; i++) {
                        let row = WorkDetailData[i];
                        const workDetailId = row.workDetailId;
                        const workRecordId = row.workRecordId;
                        const employeeId=WorkRecordmap.get(workRecordId)
                        const employeeName=EmployeeNamemap.get(employeeId)

                        const orderDetailId = row.orderDetailId;


                        const productionContentCode = row.productionContentCode;
                        const timeSpentOnProduction = row.timeSpentOnProduction;
                        const process = row.process;
                        const quantity = row.quantity;

                        dataTable.row.add([
                            workDetailId,
                            employeeName,
                            productionContentCode,
                            process,
                            timeSpentOnProduction,
                            quantity,
                        ]);

                    }
                    dataTable.draw();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }



})();