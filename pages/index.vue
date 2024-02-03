<script lang="ts" setup>
  import { ref, computed, onMounted } from 'vue';
  import { useAppStore } from '@/stores/index';
  import useDashboardStore from '~/stores/dashboardStore';
  import type { DashboardData } from '~/types/Dashboard';

  const store = useAppStore();
  const dashboardStore = useDashboardStore();
  const data = ref<DashboardData>();
  useHead({ title: 'Panel Administrativo' });

  onMounted(() => {
    dashboardStore.getDashboardData();
    nextTick(() => {
      window.dispatchEvent(new Event('resize'));
    });
  });

  watchEffect(() => {
    data.value = dashboardStore.dashboard;
  });

  // revenue
  const revenueChart = computed(() => {
    const isDark = store.theme === 'dark' || store.isDarkMode ? true : false;
    const isRtl = store.rtlClass === 'rtl' ? true : false;
    return {
      chart: {
        height: 325,
        type: 'area',
        fontFamily: 'Nunito, sans-serif',
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: 'smooth',
        width: 2,
        lineCap: 'square',
      },
      dropShadow: {
        enabled: true,
        opacity: 0.2,
        blur: 10,
        left: -7,
        top: 22,
      },
      colors: isDark ? ['#2196f3', '#e7515a'] : ['#1b55e2', '#e7515a'],
      markers: {
        discrete: [
          {
            fillColor: '#1b55e2',
            strokeColor: 'transparent',
            size: 7,
          },
        ],
      },
      labels: data.value?.evolution_balance?.labels,
      xaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: true,
        },
        labels: {
          offsetX: isRtl ? 2 : 0,
          offsetY: 5,
          style: {
            fontSize: '12px',
            cssClass: 'apexcharts-xaxis-title',
          },
        },
      },
      yaxis: {
        tickAmount: 7,
        labels: {
          offsetX: isRtl ? -30 : -10,
          offsetY: 0,
          style: {
            fontSize: '12px',
            cssClass: 'apexcharts-yaxis-title',
          },
        },
        opposite: isRtl ? true : false,
      },
      grid: {
        borderColor: isDark ? '#191e3a' : '#e0e6ed',
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
        padding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        fontSize: '16px',
        markers: {
          width: 10,
          height: 10,
          offsetX: -2,
        },
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
      },
      tooltip: {
        marker: {
          show: true,
        },
        x: {
          show: false,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: !1,
          opacityFrom: isDark ? 0.19 : 0.28,
          opacityTo: 0.05,
          stops: isDark ? [100, 100] : [45, 100],
        },
      },
    };
  });

  const revenueSeries = ref([
    {
      name: 'Balance',
      data: data.value?.evolution_balance?.data,
    },
  ]);

  watch(
    () => data.value?.evolution_balance?.data,
    (newData) => {
      if (newData) {
        revenueSeries.value = [
          {
            name: 'Balance',
            data: newData,
          },
        ];
      }
    },
  );
</script>
<template>
  <div>
    <ul class="flex space-x-2 rtl:space-x-reverse">
      <li>
        <a href="javascript:;" class="text-primary hover:underline">{{ $t('dashboard') }}</a>
      </li>
      <li class="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
        <span>Panel</span>
      </li>
    </ul>
    <div class="pt-5">
      <div class="mb-6 grid grid-cols-1 gap-6 text-white sm:grid-cols-2 xl:grid-cols-4">
        <!-- Balance -->
        <div class="panel bg-gradient-to-r from-violet-500 to-violet-400">
          <div class="flex justify-between">
            <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">{{ $t('balance') }}</div>
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">{{ data?.balance }}$</div>
            <div class="badge bg-white/30">- 2.35%</div>
          </div>
        </div>

        <!-- Registered Units -->
        <div class="panel bg-gradient-to-r from-cyan-500 to-cyan-400">
          <div class="flex justify-between">
            <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">{{ $t('registered-units') }}</div>
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3 text-center w-full">{{ data?.total_units }} {{ $t('units') }}</div>
          </div>
        </div>

        <!-- Sessions -->
        <!--         <div class="panel bg-gradient-to-r from-violet-500 to-violet-400">
          <div class="flex justify-between">
            <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">Sessions</div>
            <div class="dropdown">
              <client-only>
                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                  <button type="button">
                    <icon-horizontal-dots class="opacity-70 hover:opacity-80" />
                  </button>
                  <template #content="{ close }">
                    <ul @click="close()" class="text-black dark:text-white-dark">
                      <li>
                        <a href="javascript:;">View Report</a>
                      </li>
                      <li>
                        <a href="javascript:;">Edit Report</a>
                      </li>
                    </ul>
                  </template>
                </Popper>
              </client-only>
            </div>
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">74,137</div>
            <div class="badge bg-white/30">- 2.35%</div>
          </div>
          <div class="mt-5 flex items-center font-semibold">
            <icon-eye class="shrink-0 ltr:mr-2 rtl:ml-2" />
            Last Week 84,709
          </div>
        </div> -->

        <!-- Time On-Site -->
        <!--       <div class="panel bg-gradient-to-r from-blue-500 to-blue-400">
          <div class="flex justify-between">
            <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">Time On-Site</div>
            <div class="dropdown">
              <client-only>
                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                  <button type="button">
                    <icon-horizontal-dots class="opacity-70 hover:opacity-80" />
                  </button>
                  <template #content="{ close }">
                    <ul @click="close()" class="text-black dark:text-white-dark">
                      <li>
                        <a href="javascript:;">View Report</a>
                      </li>
                      <li>
                        <a href="javascript:;">Edit Report</a>
                      </li>
                    </ul>
                  </template>
                </Popper>
              </client-only>
            </div>
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">38,085</div>
            <div class="badge bg-white/30">+ 1.35%</div>
          </div>
          <div class="mt-5 flex items-center font-semibold">
            <icon-eye class="shrink-0 ltr:mr-2 rtl:ml-2" />
            Last Week 37,894
          </div>
        </div> -->

        <!-- Bounce Rate -->
        <!--         <div class="panel bg-gradient-to-r from-fuchsia-500 to-fuchsia-400">
          <div class="flex justify-between">
            <div class="text-md font-semibold ltr:mr-1 rtl:ml-1">Bounce Rate</div>
            <div class="dropdown">
              <client-only>
                <Popper :placement="store.rtlClass === 'rtl' ? 'bottom-start' : 'bottom-end'" offsetDistance="0" class="align-middle">
                  <button type="button">
                    <icon-horizontal-dots class="opacity-70 hover:opacity-80" />
                  </button>
                  <template #content="{ close }">
                    <ul @click="close()" class="text-black dark:text-white-dark">
                      <li>
                        <a href="javascript:;">View Report</a>
                      </li>
                      <li>
                        <a href="javascript:;">Edit Report</a>
                      </li>
                    </ul>
                  </template>
                </Popper>
              </client-only>
            </div>
          </div>
          <div class="mt-5 flex items-center">
            <div class="text-3xl font-bold ltr:mr-3 rtl:ml-3">49.10%</div>
            <div class="badge bg-white/30">- 0.35%</div>
          </div>
          <div class="mt-5 flex items-center font-semibold">
            <icon-eye class="shrink-0 ltr:mr-2 rtl:ml-2" />
            Last Week 50.01%
          </div>
        </div> -->
      </div>

      <div class="mb-6 grid gap-6 xl:grid-cols-3" v-if="data && data.evolution_balance && data.evolution_balance.data">
        <div class="panel h-full xl:col-span-3">
          <div class="mb-5 flex items-center justify-between dark:text-white-light">
            <h5 class="text-lg font-semibold">{{ $t('evolution-balance') }}</h5>
          </div>
          <p class="text-lg dark:text-white-light/90">
            {{ $t('actual-balance') }} <span class="ml-2 text-primary">{{ data.balance }}$</span>
          </p>
          <div class="relative">
            <client-only>
              <apexchart height="325" :options="revenueChart" :series="revenueSeries" class="overflow-hidden rounded-lg bg-white dark:bg-black">
                <!-- loader -->
                <div class="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                  <span class="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                </div>
              </apexchart>
            </client-only>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div class="grid gap-6 xl:grid-flow-row">
          <!-- Previous Statement -->
          <div class="panel overflow-hidden max-h-64" v-if="data?.previous_month_balance">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-lg font-bold">{{ $t('previous-statement') }} - {{ $t(data?.previous_month_balance.month) }}</div>
                <div class="text-success">{{ $t('ended-on') }} {{ data?.previous_month_balance.last_day_of_month }}</div>
              </div>
            </div>
            <div class="relative mt-10">
              <div class="absolute -bottom-12 h-24 w-24 ltr:-right-12 rtl:-left-12">
                <icon-circle-check class="h-full w-full text-success opacity-20" />
              </div>
              <div class="grid grid-cols-2 gap-6 md:grid-cols-3">
                <div>
                  <div class="text-primary">{{ $t('montly-incomes') }}</div>
                  <div class="mt-2 text-2xl font-semibold">{{ data?.previous_month_balance.total_monthly_income }}$</div>
                </div>
                <div>
                  <div class="text-primary">{{ $t('montly-expenses') }}</div>
                  <div class="mt-2 text-2xl font-semibold">{{ data?.previous_month_balance.total_monthly_expense }}$</div>
                </div>
                <div>
                  <div class="text-primary">{{ $t('total') }}</div>
                  <div class="mt-2 text-2xl font-semibold">{{ data?.previous_month_balance.difference.toFixed(2) }}$</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Current Statement -->
          <div class="panel overflow-hidden max-h-64" v-if="data?.month_balance">
            <div class="flex items-center justify-between">
              <div>
                <div class="text-lg font-bold">{{ $t('current-statement') }} - {{ $t(data?.month_balance.month) }}</div>
                <div class="text-danger">{{ $t('end-in') }} {{ data?.month_balance.last_day_of_month }}</div>
              </div>
            </div>
            <div class="relative mt-10">
              <div class="absolute -bottom-12 h-24 w-24 ltr:-right-12 rtl:-left-12">
                <icon-info-circle class="h-full w-24 text-danger opacity-20" />
              </div>

              <div class="grid grid-cols-2 gap-6 md:grid-cols-3">
                <div>
                  <div class="text-primary">{{ $t('montly-incomes') }}</div>
                  <div class="mt-2 text-2xl font-semibold">{{ data?.month_balance.total_monthly_income }}$</div>
                </div>
                <div>
                  <div class="text-primary">{{ $t('montly-expenses') }}</div>
                  <div class="mt-2 text-2xl font-semibold">{{ data?.month_balance.total_monthly_expense }}$</div>
                </div>
                <div>
                  <div class="text-primary">{{ $t('total') }}</div>
                  <div class="mt-2 text-2xl font-semibold">{{ data?.month_balance.difference.toFixed(2) }}$</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="panel">
          <div class="mb-5 text-lg font-bold">{{ $t('recent-transactions') }}</div>
          <div class="table-responsive">
            <table>
              <thead>
                <tr>
                  <th class="ltr:rounded-l-md rtl:rounded-r-md">#</th>
                  <th class="text-center ltr:rounded-r-md rtl:rounded-l-md uppercase">{{ $t('type') }}</th>
                  <th class="uppercase">{{ $t('date') }}</th>
                  <th class="uppercase">{{ $t('amount') }}</th>
                </tr>
              </thead>
              <tbody v-if="data?.transactions">
                <tr v-for="transaction in data.transactions" :key="transaction.id">
                  <td class="font-semibold">#{{ transaction.number }}</td>
                  <td class="text-center" v-if="transaction.type === 'income'">
                    <span class="badge rounded-full bg-success/20 text-success hover:top-0">{{ $t('income') }}</span>
                  </td>
                  <td class="text-center" v-else>
                    <span class="badge rounded-full bg-danger/20 text-danger hover:top-0">{{ $t('expense') }}</span>
                  </td>
                  <td class="whitespace-nowrap">{{ transaction.date }}</td>
                  <td class="whitespace-nowrap">{{ transaction.amount }}$</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
