import Home from './routes/Home.svelte';
import NotFound from './routes/NotFound.svelte';

export default {
    '/': Home,
    '*': NotFound
};