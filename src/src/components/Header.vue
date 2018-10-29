<template>
  <div>
		<header>
			<b-container class="bv-example-row">
				<b-nav class="navhed">
					<div v-for="todo in menu">
						<b-nav-item>
							<router-link :to="todo.page">{{ todo.name }}</router-link>
						</b-nav-item>
					</div>
				</b-nav>
			</b-container>
		</header>
	</div>
</template>

<script>
export default {
	name: 'Header',
	data () {
		return {
			sitename: 'Pay & Play',
			menu: [
        { name: 'Pay & Play', page: '/' },
        { name: 'Steam', page: '/page/STEAM/0' },
        { name: 'Origin', page: '/page/Origin/0' },
        { name: 'Uplay', page: '/page/UPlay/0' }
      ]
		}
	}
}
</script>
