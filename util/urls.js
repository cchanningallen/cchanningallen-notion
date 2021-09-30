import slugify from 'slugify';

function toSlug(name) {
    return slugify(name).toLocaleLowerCase();
}

export default {
    toSlug,
};
