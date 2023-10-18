(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================

    // ============================查資料回來getAll ========================
    let dataaccount = 0;
    getHeatTreatmentPrice();
    let  heatTreatmentPriceData = [];

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
                    console.log("這是研磨資料",  heatTreatmentPriceData);
                    dataaccount= heatTreatmentPriceData.length;
                    for (let i = 0; i <  heatTreatmentPriceData.length; i++) {
                        let row =  heatTreatmentPriceData[i];
                        const heatTreatmentId = row.heatTreatmentId;
                        const heatTreatmentMaterial = row.heatTreatmentMaterial;
                        const heatTreatmentType = row.heatTreatmentType;
                        const heatTreatmentUnitPrice = row.heatTreatmentUnitPrice;

                        dataTable.row.add([
                            heatTreatmentMaterial,
                            heatTreatmentType,
                            heatTreatmentUnitPrice,
                            `
            <button type="button" class="btn btn-primary"  data-bs-toggle="modal"
                    data-bs-target="#exampleModal${i}" data-bs-whatever="@mdo" id="editbutton${i}"  >修改</button>
         <div class="modal fade" id="exampleModal${i}" tabIndex="1"
         aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel${i}">研磨明細修改
                    </h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="mb-3">
                            <label For="heatTreatmentId${i}"
                                   class="col-form-label">編號:</label>
                            <input type="text" class="form-control" id="heatTreatmentId${i}" value="${heatTreatmentId}" readonly>
                        </div>
                        <div class="mb-3">
                            <label For="heatTreatmentMaterial${i}"
                                   class="col-form-label">材質:</label>
                            <input type="text" class="form-control" id="heatTreatmentMaterial${i}" value="${heatTreatmentMaterial}">
                        </div>
                        <div class="mb-3">
                                            <label for="heatTreatmentType${i}" class="col-form-label">種類:</label>
                                            <select name="" id="heatTreatmentType${i}" class="select24datatable " style="width: 300px">
                                                <option>一般</option>
                                                <option>調質</option>
                                            </select>
                                        </div>
                         <div class="mb-3">
                            <label For="heatTreatmentUnitPrice${i}"
                                   class="col-form-label">單價:</label>
                            <input type="text" class="form-control" id="heatTreatmentUnitPrice${i}" value="${heatTreatmentUnitPrice}">
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
    </div>`,
                            `<button type="button" class="btn btn-primary" id="delete${i}">刪除</button>`]);

                    }
                    dataTable.draw();
                    seteditbutton();
                    setdeletebutton();
                    selected4edit();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }


    // ============================  初始化datatable函式========================

    let dataTable = $('#all').DataTable({
        scrollY: '600px',
        scrollCollapse: true,
        paging: true,
        pageLength: 15,
        info: false,
        destroy: true,
    });

//自動選好修改內的select
    function selected4edit() {
        for (let i = 0; i < dataaccount; i++) {
            const heatTreatmentTypeselect = $(`#heatTreatmentType${i}`);
            let row =  heatTreatmentPriceData[i];
            const heatTreatmentType = row.heatTreatmentType;
            heatTreatmentTypeselect.val(heatTreatmentType).trigger('change.select2');
        }
    }
  // ============================ 修改資料進去 editOrder()========================
    function editOrder(i) {
        const heatTreatmentId = document.getElementById(`heatTreatmentId${i}`).value;
        const heatTreatmentMaterial = document.getElementById(`heatTreatmentMaterial${i}`).value;
        const heatTreatmentType = document.getElementById(`heatTreatmentType${i}`).value;
        const heatTreatmentUnitPrice = document.getElementById(`heatTreatmentUnitPrice${i}`).value;

        // if (customerId === '') {
        //     return;
        // }
        // 檢查結束

        fetch('editHeatTreatmentPrice', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                heatTreatmentId: heatTreatmentId,
                heatTreatmentMaterial: heatTreatmentMaterial,
                heatTreatmentType: heatTreatmentType,
                heatTreatmentUnitPrice: heatTreatmentUnitPrice,
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

    function seteditbutton() {
        for (let i = 0; i < dataaccount; i++) {
            const editbuttons = document.getElementById('confirm' + i);
            editbuttons?.addEventListener('click', () => {
                console.log('修改按鈕啟動' + i)
                editOrder(i);
            })
        }
    }

//     // ============================   newOrder()新增訂單========================
    function newOrder() {
        const heatTreatmentMaterial4new = document.querySelector('#heatTreatmentMaterial4new').value;
        const heatTreatmentType4new = document.querySelector('#heatTreatmentType4new').value;
        const heatTreatmentUnitPrice4new = document.querySelector('#heatTreatmentUnitPrice4new').value;
        if (heatTreatmentMaterial4new === '') {
            return;
        }
        if (heatTreatmentType4new === '') {
            return;
        }
        if (heatTreatmentUnitPrice4new === '') {
            return;
        }

        fetch('newHeatTreatmentPrice', {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                heatTreatmentMaterial: heatTreatmentMaterial4new,
                heatTreatmentType: heatTreatmentType4new,
                heatTreatmentUnitPrice: heatTreatmentUnitPrice4new,
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
                        location.reload()
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
            const heatTreatmentId = heatTreatmentPriceData[i].heatTreatmentId;
            const deletebutton = document.getElementById('delete' + i);
            deletebutton?.addEventListener('click', () => {
                console.log('第' + i + '個的ｉｄ:' + heatTreatmentId)
                deledtbyPK(heatTreatmentId);
            })
        }
    }

    // ============================9. 刪除方法========================
    function deledtbyPK(heatTreatmentId) {
        const confirmed = confirm("確定要刪除嗎？");
        console.log(heatTreatmentId)
        if (confirmed) {
            fetch('deleteHeatTreatmentPrice', {
                method: 'POST', headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify(heatTreatmentId),
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
                            location.reload()
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