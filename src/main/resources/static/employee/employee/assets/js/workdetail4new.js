(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================
    // ============================查資料回來getAll ========================
    getOrderDetail2();
    let OrderDetailData2 = [];
    let WorkRecordData = [];

    function getOrderDetail2() {
        fetch("getAllOrderDetail2", {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: "0",
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
                    OrderDetailData2 = data;
                    console.log("這是未完成的訂單明細資料", OrderDetailData2);
                    const WorkRecordDataString = sessionStorage.getItem('WorkRecordData');
                    if (WorkRecordDataString !== null) {
                        WorkRecordData = JSON.parse(WorkRecordDataString);
                    }
                    getOrderDetail();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ============================查資料回來getAll ========================

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
                    getProductionContentCode();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ============================查資料回來getAll ========================

    let ProductionContentCodeData = [];
    let Multipliermap = new Map();

    function getProductionContentCode() {
        fetch("getAllProductionContentCode")
            .then(function (response) {
                // 檢查 API 响應的狀態碼
                if (response.status !== 200) {
                    console.log('發生錯誤，狀態碼：' + response.status);
                    return;
                }
                // 解析 JSON 格式的數據
                response.json().then(function (data) {
                    // 在此處可以處理從 API 獲取的數據
                    ProductionContentCodeData = data;
                    console.log("這是代號資料", ProductionContentCodeData);
                    data.forEach(function (row) {
                        const productionContentCode = row.productionContentCode;
                        const productionContentName = row.productionContentName;
                        const productionPerformanceMultiplier = row.productionPerformanceMultiplier;
                        Multipliermap.set(productionContentName, productionPerformanceMultiplier)
                    })
                    console.log(Multipliermap)
                    getWorkDetail();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ============================查資料回來getAll ========================
    let dataaccount = 0;

    let WorkDetailData = [];

    function getWorkDetail() {
        const WorkRecordId = WorkRecordData.workRecordId;
        fetch("getWorkDetailByWorkRecordId", {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: WorkRecordId,
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
                        const orderDetailId = row.orderDetailId;
                        let newstring = ""
                        OrderDetailData.forEach(function (row) {
                            const length = row.length;
                            const width = row.width;
                            const thickness = row.thickness;
                            const orderDetailId2 = row.orderDetailId;
                            if (orderDetailId === orderDetailId2) {
                                newstring = length + "*" + width + "*" + thickness
                            }
                        })

                        const productionContentCode = row.productionContentCode;
                        const timeSpentOnProduction = row.timeSpentOnProduction;
                        const process = row.process;
                        const quantity = row.quantity;

                        dataTable.row.add([
                            workDetailId,
                            newstring,
                            productionContentCode,
                            process,
                            timeSpentOnProduction,
                            quantity,

                            `
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
         <div class="modal fade" id="exampleModal${i}" tabIndex="1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel${i}">明細修改
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label For="workDetailId${i}"
                                   class="col-form-label">工作明細編號:</label>
                            <input type="text" class="form-control" id="workDetailId${i}" value="${workDetailId}" readonly>
                        </div>
                       <div class="mb-3">
                            <label For="workRecordId${i}"
                                   class="col-form-label">工作記錄編號:</label>
                            <input type="text" class="form-control" id="workRecordId${i}" value="${workRecordId}" readonly>
                        </div>
                         <div class="mb-3">
                            <label For="orderDetailId${i}"
                                   class="col-form-label">訂單明細編號:</label>
                            <input type="text" class="form-control" id="orderDetailId${i}" value="${orderDetailId}" readonly>
                        </div>
                        <div class="mb-3">
                            <label For="productionContentCode${i}"
                                   class="col-form-label">製作機台:</label>
                            <select name="" id="productionContentCode${i}" class="select24datatable" style="width: 300px"> </select>
                        </div>
                         <div class="mb-3">
                            <label For="process${i}"
                                   class="col-form-label">製程:</label>
                            <select name="" id="process${i}" class="select24datatable" style="width: 300px">
                              <option value="1.厚度">1.厚度</option>
                                                <option value="2.寬度">2.寬度</option>
                                                <option value="3.長度">3.長度</option>
                                                <option value="4.外型">4.外型</option>
                                                <option value="5.斜度">5.斜度</option>
                                                <option value="6.槽">6.槽</option>
                                                <option value="7.鑽孔">7.鑽孔</option>
                                                <option value="8.長圓孔">8.長圓孔</option>
                                                <option value="9.端直">9.端直</option>
                                                <option value="10.齒">10.齒</option>
                                                <option value="11.研磨">11.研磨</option>
                                                <option value="12.包裝">12.包裝</option>
                                                <option value="13.拆組裝">13.拆組裝</option>
                                                <option value="14.清潔">14.清潔</option>
                                                <option value="15.精修">15.精修</option>
<!--                                                <option value=""></option>-->
<!--                                                <option value=""></option>-->
<!--                                                <option value=""></option>-->
<!--                                                <option value=""></option>-->
<!--                                                <option value=""></option>-->
                          </select>
                        </div>
                         <div class="mb-3">
                            <label For="timeSpentOnProduction${i}"
                                   class="col-form-label">製作花費時間:</label>
                            <input type="text" class="form-control" id="timeSpentOnProduction${i}" value="${timeSpentOnProduction}">
                        </div>
                         <div class="mb-3">
                            <label For="quantity${i}"
                                   class="col-form-label">數量:</label>
                            <input type="text" class="form-control" id="quantity${i}" value="${quantity}">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <span id="msg"> </span>
                    <button type="button" class="btn btn-secondary editbutton"
                            data-bs-dismiss="modal" id="cancle${i}">取消
                    </button>
                    <button type="button" class="btn btn-primary" id="confirm${i}">修改</button>
                </div>
            </div>
        </div>
    `,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }


                    dataTable.draw();
                    seteditbutton();
                    setdeletebutton();
                    // selected4edit();
                    workRecordIdinput();
                    reloadscroll();
                    select4edit();
                    selected4edit();
                    editOrde2();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    // ============================  初始化datatable函式========================

    let dataTable = $('#all').DataTable({
        // scrollY: '600px',
        scrollCollapse: false,
        paging: false,
        pageLength: 15,
        info: false,
        destroy: true,
    });

    function reloadscroll() {
        window.addEventListener('load', function () {
            // 从本地存储中检索滚动位置
            let savedScrollPosition = localStorage.getItem('scrollPosition');
            // 将页面滚动到保存的位置
            window.scrollTo(0, savedScrollPosition);
        });
    };

// 自動選好修改內的select
    function selected4edit() {
        for (let i = 0; i < dataaccount; i++) {
            const productionContentCodeselect = $(`#productionContentCode${i}`);
            const processselect = $(`#process${i}`);
            let row = WorkDetailData[i];
            const productionContentCode = row.productionContentCode;
            const process = row.process;
            productionContentCodeselect.val(productionContentCode).trigger('change.select2');
            processselect.val(process).trigger('change.select2');
        }
    }

    // ============================ 修改資料進去 editOrder()========================
    function editOrder(i) {
        const workDetailId = document.getElementById(`workDetailId${i}`).value;
        const workRecordId = document.getElementById(`workRecordId${i}`).value;
        const orderDetailId = document.getElementById(`orderDetailId${i}`).value;
        const process = document.getElementById(`process${i}`).value;
        const productionContentCode = document.getElementById(`productionContentCode${i}`).value;
        const timeSpentOnProduction = document.getElementById(`timeSpentOnProduction${i}`).value;
        const quantity = document.getElementById(`quantity${i}`).value;


        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editWorkDetail', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                workDetailId: workDetailId,
                workRecordId: workRecordId,
                orderDetailId: orderDetailId,
                productionContentCode: productionContentCode,
                timeSpentOnProduction: timeSpentOnProduction,
                process: process,
                quantity: quantity,
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
                        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                        localStorage.setItem('scrollPosition', scrollPosition);
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
    // ============================ 抓取所有修改的燈箱’修改‘按鈕 並綁定事件 ========================

    function seteditbutton() {
        for (let i = 0; i < dataaccount; i++) {
            const editbuttons = document.getElementById('confirm' + i);
            editbuttons?.addEventListener('click', () => {
                console.log('修改按鈕啟動' + i)
                editOrder(i);
            })
        }
    }


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
    const recordDate = $('#recordDate4new');
    const deliveryDate4new = $('#deliveryDate4new');

    recordDate.val(formattedDate);
    deliveryDate4new.val(formattedDate2);

//     // ============================   newOrder()新增訂單========================
    function newOrder() {
        const workRecordId = document.querySelector('#workRecordId4new').value;
        const orderDetailId = document.querySelector('#orderDetailId4new').value;
        const productionContentCode = document.querySelector('#productionContentCode4new').value;
        const process = document.querySelector('#process4new').value;
        const timeSpentOnProduction = document.querySelector('#timeSpentOnProduction4new').value;
        const quantity = document.querySelector('#quantity4new').value;


        fetch('newWorkDetail', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                workRecordId: workRecordId,
                orderDetailId: orderDetailId,
                productionContentCode: productionContentCode,
                process: process,
                timeSpentOnProduction: timeSpentOnProduction,
                quantity: quantity,

            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful, message} = body;
                if (successful) {

                    Swal.fire({
                        position: 'center', icon: 'success', title: '新增成功!', showConfirmButton: false, timer: 1500
                    }).then(() => {
                        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                        localStorage.setItem('scrollPosition', scrollPosition);
                        location.reload();
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: `${message}`, footer: '<a href=""></a>'
                    })
                }
                ;

            });

    };

    const newbutton = document.querySelector('#newbutton');
    newbutton.addEventListener('click', () => {
        newOrder();
    })
//

//
    // ============================7. 找到所有刪除按鈕並加上事件========================

    function setdeletebutton() {
        for (let i = 0; i < dataaccount; i++) {
            const workDetailId = WorkDetailData[i].workDetailId;
            const deletebutton = document.getElementById('delete' + i);
            deletebutton?.addEventListener('click', () => {
                console.log('第' + i + '個的ｉｄ:' + workDetailId)
                deledtbyPK(workDetailId);
            })
        }
    }

    // ============================9. 刪除方法========================
    function deledtbyPK(workDetailId) {
        const confirmed = confirm("確定要刪除嗎？");
        if (confirmed) {
            fetch('deleteWorkDetail', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(workDetailId),
            })
                .then((resp) => {
                    if (resp) {
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: '刪除成功!',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(() => {
                            let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

                            localStorage.setItem('scrollPosition', scrollPosition);
                            location.reload();
                        })
                    } else {
                        Swal.fire({
                            icon: 'error', title: 'Oops...', text: '刪除失敗!', footer: '<a href=""></a>'
                        })
                    }
                })
        }
    };

    // ===============================14日期轉換====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    // ==================================================================
    function select4edit() {
        //修改的select清空
        for (let i = 0; i < dataaccount; i++) {
            const productionContentCode = $('#productionContentCode' + i)
            productionContentCode.empty();

            //種類名稱elect動態放入
            const productionContentNames = new Set();
            ProductionContentCodeData.forEach(function (row) {
                const productionContentName = row.productionContentName;
                productionContentNames.add(productionContentName);
            })
            productionContentNames.forEach(function (row) {
                const option = new Option(row, row);
                productionContentCode.append(option);
            })
            // categoryName.select2();

        }

        const productionContentCode4new = $('#productionContentCode4new');
        const orderDetailId4new = $('#orderDetailId4new');
        productionContentCode4new.empty();
        orderDetailId4new.empty();
        //種類名稱elect動態放入
        const productionContentNames = new Set();
        ProductionContentCodeData.forEach(function (row) {
            const productionContentName = row.productionContentName;
            productionContentNames.add(productionContentName);
        })
        productionContentNames.forEach(function (row) {
            const option = new Option(row, row);
            productionContentCode4new.append(option);
        })
        // categoryName.select2();

        OrderDetailData2.forEach(function (row) {
            const length = row.length;
            const width = row.width;
            const thickness = row.thickness;
            const newstring = length + "*" + width + "*" + thickness
            const orderDetailId = row.orderDetailId;
            const option = new Option(newstring, orderDetailId);
            orderDetailId4new.append(option);
        })

        // categoryName.select2();

    }

    // ===============================^^^方法區^^^====================================

    // ===============================VVV使用方法區VVV================================
    function workRecordIdinput() {
        const workRecordId4new = document.querySelector('#workRecordId4new');
        const title = document.querySelector('#title');
        const workRecordId4newvalue = WorkRecordData.workRecordId;
        workRecordId4new.value = workRecordId4newvalue;
        title.textContent = "編號"+workRecordId4newvalue;
    }

    //=================================修改績效=================================
    function editOrde2() {
        const workRecordId2 = WorkRecordData.workRecordId;
        let totalScore = 0;
        WorkDetailData.forEach(function (row) {
            const timeSpentOnProduction = row.timeSpentOnProduction;
            const productionContentCode = row.productionContentCode;
            const Multiplier = Multipliermap.get(productionContentCode);
            const quantity = row.quantity;
            totalScore += (timeSpentOnProduction * Multiplier * quantity);
        })
        console.log(totalScore)
        fetch('editWorkRecord', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                workRecordId: workRecordId2,
                performanceScore: totalScore,
            }),
        })
            .then(resp => resp.json())
            .then(body => {
                console.log(body);
                const {successful} = body;
                if (successful) {
                    Swal.fire({
                        position: 'center', icon: 'success', title: '修改成功!', showConfirmButton: false, timer: 1
                    }).then(() => {
                        let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
                        localStorage.setItem('scrollPosition', scrollPosition);
                    })
                } else {
                    Swal.fire({
                        icon: 'error', title: 'Oops...', text: '修改失敗!', footer: '<a href=""></a>'
                    })
                }
            });

    }

    // ===============================2. 確認新增按鈕================================


//=================================3. 圖片檔案上傳按鈕=============================


    // ===============================^^^使用方法區^^^==============================

})();