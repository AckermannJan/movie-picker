<template>
  <div>
    <div style="display: flex;align-items: center;">
      <div
        v-for="selectedGenre in selectedGenres"
        :key="selectedGenre.id"
      >
        <el-tag
          closable
          :disable-transitions="false"
          style="margin-right: 10px;"
          @close="deselectGenre(selectedGenre)"
        >
          {{selectedGenre.name}}
        </el-tag>
      </div>
      <el-dropdown trigger="click" @command="selectGenre">
        <el-button :loading="loadingGenre">
          <i v-if="!loadingGenre" class="el-icon-plus el-icon--left"/>Genre Hinzufügen<i class="el-icon-arrow-down el-icon--right" />
        </el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="genre in notSelectedGenre"
            :key="genre.id"
            :command="genre"
          >
            {{ genre.name }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "GenreSelector",
  computed: {
    ...mapState({
      loadingGenre: state => state.genre.loading,
      genreList: state => state.genre.genreList,
      selectedGenres: state => state.genre.selectedGenres,
    }),
    notSelectedGenre () {
      const selectedGenreIds = this.selectedGenres.map((selectedGenre) => selectedGenre.id)
      return this.genreList.filter((genre) => {
        return !selectedGenreIds.includes(genre.id)
      })
    }
  },
  mounted() {
    this.loadGenre();
  },
  methods: {
    ...mapActions({
      loadGenre: 'genre/loadGenre',
      selectGenre: 'genre/selectGenre',
      deselectGenre: 'genre/deselectGenre',
    }),
  },
}
</script>
