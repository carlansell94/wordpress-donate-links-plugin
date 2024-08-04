<?php
/**
 * Plugin Name:       Donate Links
 * Description:       Add a donate block to your site. Includes styles for Buy Me a Coffee, Ko-Fi, Patreon and PayPal.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Carl Ansell
 * Author URI:		  https://carlansell.co.uk
 * License:           GPL-3.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:       qb-donate
 */

function render_donate_links_block($attributes)
{
?>
	<div class="qb-donate" style="background-image:<?= $attributes['background'] ?>">
		<img src="<?= get_site_icon_url() ?>" <?php if (!$attributes['logoDisplay']) echo "style='visibility:hidden'" ?>>
		<p <?php if (!$attributes['logoDisplay']) echo "style='top:-2.5rem'"?>>
			<?= $attributes['donateText'] ?>
		</p>
	<?php foreach ($attributes['donations'] as $donation) : ?>
		<a class=<?= strtolower(str_replace(" ", "", $donation['type'])) ?> href=<?= $donation['url'] ?> target="_blank">
			<?= $donation['text'] ? $donation['text'] : $donation['type'] ?>
		</a>
	<?php endforeach; ?>
	</div>
<?php
}

function init_donate_links()
{
	register_block_type_from_metadata(
		__DIR__ . '/build',
		array(
			'render_callback' => 'render_donate_links_block',
		)
	);
}

add_action( 'init', 'init_donate_links' );
