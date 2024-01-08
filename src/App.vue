<script setup>
import { onMounted, ref } from "vue";
import useBlogs from "../src/composables/blogApi";
import { RouterView } from "vue-router";

const { blogs, error, statusCode, getAllBlogs } = useBlogs();
const loading = ref(true);

onMounted(async () => {
  try {
    await getAllBlogs();
  } catch (err) {
    console.error("Error fetching blogs:", err);
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top"
    id="sideNav"
  >
    <a class="navbar-brand js-scroll-trigger" href="#page-top">
      <span class="d-none d-lg-block"
        ><img
          class="img-fluid img-profile mx-auto mb-2"
          src="./assets/img/JERPLOGO2.png"
          alt=""
          style="border: none"
      /></span>
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink :to="{ name: 'home' }" class="nav-link js-scroll-trigger"
            >Blog</RouterLink
          >
        </li>
        <li class="nav-item">
          <a class="nav-link js-scroll-trigger" href="#"><hr /></a>
        </li>

        <!-- Loading state -->
        <li v-if="loading" class="nav-item">Loading...</li>

        <!-- Error state -->
        <li v-if="error" class="nav-item">Error fetching blogs: {{ error }}</li>

        <!-- Display blogs when not loading and no error -->
        <ul class="navbar-nav" v-if="blogs.length > 0">
          <li v-for="blog in blogs" :key="blog.id">
            <RouterLink
              :to="{ name: 'view', params: { id: blog.id } }"
              class="nav-link"
              >{{ blog.title }}</RouterLink
            >
            <!-- <a class="nav-link" :href="'#' + blog.id">{{ blog.title }}</a> -->
          </li>
        </ul>
      </ul>
    </div>
  </nav>
  <div class="container-fluid p-0">
    <RouterView />
  </div>
</template>
