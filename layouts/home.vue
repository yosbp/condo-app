<template>
  <nav class="navbar" id="navbar">
    <div class="container relative flex flex-wrap items-center justify-between">
      <a class="navbar-brand md:me-8" href="index.html">
        <!-- <img src="assets/images/logo-dark.png" class="h-5 inline-block dark:hidden" alt=""> -->
        <img src="assets/light-logo.png" class="h-5 hidden dark:inline-block" alt="" />
      </a>

      <div class="nav-icons flex items-center lg_992:order-2 md:ms-6">
        <!-- Navbar Button -->
        <ul class="list-none menu-social mb-0"></ul>
        <!-- Navbar Collapse Manu Button -->
        <button
          data-collapse="menu-collapse"
          type="button"
          class="collapse-btn inline-flex items-center ms-2 text-slate-900 dark:text-white lg_992:hidden"
          aria-controls="menu-collapse"
          aria-expanded="false"
        >
          <span class="sr-only">Navigation Menu</span>
          <i class="mdi mdi-menu text-[24px]"></i>
        </button>
      </div>

      <!-- Navbar Manu -->
      <div class="navigation lg_992:order-1 lg_992:flex hidden" id="menu-collapse">
        <ul class="navbar-nav" id="navbar-navlist">
          <li class="nav-item">
            <a class="nav-link active" href="#home">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#features">Features</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#screenshot">Application</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#faqs">FAQs</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#download">Download</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#reviews">Reviews</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#contact">Contact us</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <NuxtPage />
</template>
