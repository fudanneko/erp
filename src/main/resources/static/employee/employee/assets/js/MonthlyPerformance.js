(() => {
    const tbody = document.querySelector('#tbody');


    // ===============================VVV方法區VVV====================================

    getEmployee();
    let EmployeeData = [];

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
                    getWorkRecord();
                });
            })
            .catch(function (err) {
                console.log('錯誤：', err);
            });
    }

    // ============================查資料回來getAll ========================
    let dataaccount = 0;

    let WorkRecordData = [];
    let workRecordData4month = [];

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
                    dataaccount = WorkRecordData.length;
                    yearmonthselect();
                    reloadscroll();
                    setselectbutton();
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


    function createdatatableData() {

        const yearselect = document.getElementById('year').value;
        const monthselect = document.getElementById('month').value;

        const datatableData = {};
        // 將WorkRecordData依照年月篩選
        const filteredData = WorkRecordData.filter(entry => {
                const recordDate = new Date(entry.recordDate);
                return Number(recordDate.getFullYear()) === Number(yearselect) && Number(recordDate.getMonth() + 1) === Number(monthselect)
            }
        )

        // 用篩選後的結果ㄝ，產生一個字串KEY,姓名,績效,且不重複
        filteredData.forEach(function (row) {
            const employeeId = row.employeeId;
            let employeename = '';
            for (const row of EmployeeData) {
                const employeeIda = row.employeeId;
                const employeenamea = row.employeeName;
                if (employeeId === employeeIda) {
                    employeename = employeenamea;
                }
            }
            const key = `${employeename}`;
            if (!datatableData[key]) {
                datatableData[key] = {
                    name: employeename,
                    totalPerformance: 0,
                };
            }
            datatableData[key].totalPerformance += row.performanceScore;


        })

        const aggregatedData = Object.values((datatableData));

        for (let i = 0; i < aggregatedData.length; i++) {
            const row = aggregatedData[i];
            console.log(row)
            const employeename = row.name;
            const totalPerformance = row.totalPerformance;

            dataTable.row.add([
                employeename,
                yearselect,
                monthselect,
                totalPerformance,
            ]);
        }
        dataTable.draw();
    }


    function setselectbutton() {
        const selectbutton = document.getElementById('selectbutton');
        selectbutton?.addEventListener('click', () => {
            console.log('查詢按鈕啟動')
            createdatatableData();
        })

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


    // ===============================14日期轉換====================================
    function dateformat(date) {
        const formattedDate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
        return formattedDate;
    }

    function istargetMonth(date) {
        const yearAndMonth = new Date(date).toISOString().slice(0, 7);
        const [year, month] = yearAndMonth.split('-').map(Number);
        return year === targetYear && month === targetMonth;

    }

    function yearmonthselect() {
        const currentYear = new Date().getFullYear();

// 創建年份下拉式選單
        const yearSelect = document.getElementById('year');
        for (let year = currentYear; year >= currentYear - 10; year--) {
            const option = document.createElement('option');
            option.value = year;
            option.text = year;
            yearSelect.add(option);
        }

// 創建月份下拉式選單
        const monthSelect = document.getElementById('month');
        for (let month = 1; month <= 12; month++) {
            const option = document.createElement('option');
            option.value = month;
            option.text = month.toString().padStart(2, '0'); // 將月份格式化為兩位數，例如 01、02
            monthSelect.add(option);
        }

    }

    // ===============================詳情按鈕 資料寫入storage===================================
    // ===============================^^^方法區^^^====================================

    // ===============================VVV使用方法區VVV================================

    // ===============================^^^使用方法區^^^==============================

})();