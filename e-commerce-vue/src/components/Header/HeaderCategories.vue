<script setup lang="ts">
import { ref } from 'vue'
import type { ICategory } from '@/types/components/Header'

// this may come fakeApi later
const categories = ref<Array<ICategory>>([
  {
    name: 'Elektronik',
    id: 1,
    routeUrl: 'elektronik',
    categoryImage:
      'https://n11scdn.akamaized.net/a1/30/23/04/27/50/92/89/68/98/82/81/83/46/87911743275366201592.png',
    subCategories: [
      {
        name: 'Bilgisayar',
        id: 8,
        routeUrl: 'computer'
      },
      {
        name: 'Telefon',
        id: 9,
        routeUrl: 'phone'
      },
      {
        name: 'Televizyon',
        id: 10,
        routeUrl: 'tv'
      }
    ]
  },
  {
    name: 'Moda',
    id: 2,
    routeUrl: 'moda',
    categoryImage:
      'https://n11scdn.akamaized.net/a1/30/22/08/01/53/46/97/55/78/81/00/58/49/31961828233979739225.png',
    subCategories: [
      {
        name: 'Erkek Giyim',
        id: 11,
        routeUrl: 'men-clothing'
      },
      {
        name: 'Kadın Giyim',
        id: 12,
        routeUrl: 'women-clothing'
      },
      {
        name: 'Çocuk Giyim',
        id: 13,
        routeUrl: 'kids-clothing'
      }
    ]
  },
  {
    name: 'Ev & Yaşam',
    id: 3,
    routeUrl: 'home-living',
    categoryImage:
      'https://n11scdn.akamaized.net/a1/30/22/08/01/86/32/24/29/29/47/16/41/05/57126929366806936432.png',
    subCategories: [
      {
        name: 'Oturma Odası',
        id: 14,
        routeUrl: 'living-room'
      },
      {
        name: 'Yatak Odası',
        id: 15,
        routeUrl: 'bedroom'
      },
      {
        name: 'Mutfak',
        id: 16,
        routeUrl: 'kitchen'
      }
    ]
  },
  {
    name: 'Anne & Bebek',
    id: 4,
    routeUrl: 'babies',
    categoryImage:
      'https://n11scdn.akamaized.net/a1/30/22/08/01/77/23/79/89/22/11/13/67/06/1817596495358676750.png',
    subCategories: [
      {
        name: 'Oyuncak',
        id: 17,
        routeUrl: 'toys'
      },
      {
        name: 'Gıda',
        id: 18,
        routeUrl: 'babies-food'
      },
      {
        name: 'Bebek Güvenlik',
        id: 19,
        routeUrl: 'security'
      }
    ]
  },
  {
    name: 'Kozmetik & Kişisel Bakım',
    id: 5,
    routeUrl: 'self-care',
    categoryImage:
      'https://n11scdn.akamaized.net/a1/30/22/08/01/82/78/22/64/91/17/58/84/05/11823586115151480719.png',
    subCategories: [
      {
        name: 'Saç Bakım',
        id: 20,
        routeUrl: 'hair-care'
      },
      {
        name: 'Cilt Bakım',
        id: 21,
        routeUrl: 'skin-care'
      },
      {
        name: 'Makyaj Malzemeleri',
        id: 22,
        routeUrl: 'makeup'
      }
    ]
  },
  {
    name: 'Takı',
    id: 6,
    routeUrl: 'accessories',
    categoryImage:
      'https://n11scdn.akamaized.net/a1/30/23/05/30/61/78/87/08/84/35/58/58/07/48911776658065241375.png',
    subCategories: [
      {
        name: 'Kolye',
        id: 23,
        routeUrl: 'neckles'
      },
      {
        name: 'Küpe',
        id: 24,
        routeUrl: 'earing'
      },
      {
        name: 'Saat',
        id: 25,
        routeUrl: 'watch'
      }
    ]
  },
  {
    name: 'Spor',
    id: 7,
    routeUrl: 'sport',
    categoryImage:
      'https://n11scdn.akamaized.net/a1/30/22/08/01/78/48/54/32/73/75/59/66/38/52455961286243405128.png',
    subCategories: [
      {
        name: 'Futbol',
        id: 26,
        routeUrl: 'football'
      },
      {
        name: 'Basketbol',
        id: 27,
        routeUrl: 'basketball'
      },
      {
        name: 'voleybol',
        id: 28,
        routeUrl: 'tv'
      }
    ]
  }
])
</script>

<template>
  <div class="w-full bg-gray-50">
    <div class="container mx-auto px-10 flex items-center justify-between py-4">
      <!-- <div
        v-for="category in categories"
        :key="category.id"
        class="flex gap-1 items-center cursor-pointer"
      >
        <img class="w-[30px] h-[30px] rounded-sm" :src="category.categoryImage" alt="" />
        <span class="text-md">{{ category.name }}</span>
      </div> -->
      <a-dropdown v-for="category in categories" :key="category.id">
        <a class="ant-dropdown-link flex gap-1 items-center cursor-pointer" @click.prevent>
          <img class="w-[30px] h-[30px] rounded-sm" :src="category.categoryImage" alt="" />
          <span class="text-md">{{ category.name }}</span>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item v-for="sub in category.subCategories" :key="sub.id">
              <a href="javascript:;">{{ sub.name }}</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<style scoped></style>
