(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================

    // getEmployee();
    // let EmployeeData = [];

    // function getEmployee() {
    //     fetch("getAllProductionContentCode")
    //         .then(function (response) {
    //             // 檢查 API 响應的狀態碼
    //             if (response.status !== 200) {
    //                 console.log('發生錯誤，狀態碼：' + response.status);
    //                 return;
    //             }
    //
    //             // 解析 JSON 格式的數據
    //             response.json().then(function (data) {
    //                 // 在此處可以處理從 API 獲取的數據
    //                 EmployeeData = data;
    //                 console.log("這是員工資料", EmployeeData);
    //
    //             });
    //         })
    //         .catch(function (err) {
    //             console.log('錯誤：', err);
    //         });
    // }

    // ============================查資料回來getAll ========================
    let dataaccount = 0;
    getProductionContentCode();
    let ProductionContentCodeData = [];

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
                    dataaccount = ProductionContentCodeData.length;
                    for (let i = 0; i < ProductionContentCodeData.length; i++) {
                        let row = ProductionContentCodeData[i];
                        const productionContentCode = row.productionContentCode;
                        const productionContentName = row.productionContentName;
                        const productionPerformanceMultiplier = row.productionPerformanceMultiplier;

                        // for (const row of EmployeeData) {
                        //     const employeeIda=row.employeeId;
                        //     const employeenamea=row.employeeName;
                        //     if(employeeId===employeeIda){
                        //         employeename=employeenamea;
                        //     }
                        //
                        // }

                        dataTable.row.add([
                            productionContentCode,
                            productionContentName,
                            productionPerformanceMultiplier,
                            `
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
         <div class="modal fade" id="exampleModal${i}" tabIndex="1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel${i}">績效修改
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label For="productionContentCode${i}"
                                   class="col-form-label">代號:</label>
                            <input type="text" class="form-control" id="productionContentCode${i}" value="${productionContentCode}" readonly>
                        </div>
                        
                       <div class="mb-3">
                            <label For="productionContentName${i}"
                                   class="col-form-label">名稱:</label>
                            <input type="text" class="form-control" id="productionContentName${i}" value="${productionContentName}">
                        </div>
                         <div class="mb-3">
                            <label For="productionPerformanceMultiplier${i}"
                                   class="col-form-label">績效倍率:</label>
                            <input type="text" class="form-control" id="productionPerformanceMultiplier${i}" value="${productionPerformanceMultiplier}">
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
                            `<a href="#"><button type="button" class="btn btn-outline-primary">詳情</button></a>`,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    seteditbutton();
                    setdeletebutton();
                    // selected4edit();
                    reloadscroll();
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
//     function selected4edit() {
//         for (let i = 0; i < dataaccount; i++) {
//             const productionContentCode = $(`#productionContentCode${i}`);
//             let row = ProductionContentCodeData[i];
//             const productionContentCode = row.productionContentCode;
//             console.log(productionContentCode)
//             productionContentCode.val(productionContentCode).trigger('change.select2');
//         }
//     }

    // ============================ 修改資料進去 editOrder()========================
    function editOrder(i) {
        const productionContentCode = document.getElementById(`productionContentCode${i}`).value;
        const productionContentName = document.getElementById(`productionContentName${i}`).value;
        const productionPerformanceMultiplier = document.getElementById(`productionPerformanceMultiplier${i}`).value;


        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editProductionContentCode', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                productionContentCode: productionContentCode,
                productionContentName: productionContentName,
                productionPerformanceMultiplier: productionPerformanceMultiplier,

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
        const productionContentCode = document.querySelector('#productionContentCode4new').value;
        const productionContentName = document.querySelector('#productionContentName4new').value;
        const productionPerformanceMultiplier = document.querySelector('#productionPerformanceMultiplier4new').value;


        fetch('newProductionContentCode', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                productionContentCode: productionContentCode,
                productionContentName: productionContentName,
                productionPerformanceMultiplier: productionPerformanceMultiplier,

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
            const productionContentCode = productionContentCode[i].productionContentCode;
            const deletebutton = document.getElementById('delete' + i);
            deletebutton?.addEventListener('click', () => {
                console.log('第' + i + '個的ｉｄ:' + productionContentCode)
                deledtbyPK(productionContentCode);
            })
        }
    }

    // ============================9. 刪除方法========================
    function deledtbyPK(productionContentCode) {
        const confirmed = confirm("確定要刪除嗎？");
        console.log(productionContentCode)
        if (confirmed) {
            fetch('deleteProductionContentCode', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(productionContentCode),
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

    // ===============================詳情按鈕 資料寫入storage===================================

    // ===============================^^^方法區^^^====================================

    // ===============================VVV使用方法區VVV================================

    //=================================1. 總之先查一次=================================

    // ===============================2. 確認新增按鈕================================


//=================================3. 圖片檔案上傳按鈕=============================


    // ===============================^^^使用方法區^^^==============================

})();