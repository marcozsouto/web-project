import Item from '#models/Item.js'
import fs  from 'fs';
import path from 'path';
import randomstring from 'randomstring';
import { Op } from 'sequelize'
export default class ItemService {
    async index(filter) {
        const itens = await Item.findAll(this.getFilter(filter))
        return itens
    }

    getFilter(filter) {
        if (filter?.name) {
            return {
                where: {
                    name: {
                        [Op.like]: `%${filter.name}%`
                    }
                }    
            };
        }

        return {};
    }

    async store(data) {
        data.image = await this.uploadFile(data)
        const item = await Item.create(data)
        return item
    }

    async update(id, data) {
        const item = await Item.findByPk(id)

        if (!item) {
            return null
        }

        data.image = await this.uploadFile(data, item)
        await item.update(data)
        return item
    }

    async destroy(id) {
    
        const item = await Item.findByPk(id)

        if (!item) {
            return true;
        }

        if (item.image) {
            this.destroyImage(item.image);
        }

        const result = await item.destroy();
        return result === 1
    }

    async show(id) {
        const item = await Item.findByPk(id)

        return item;
    }

    async uploadFile(body, item = null) {
        if (!body.image) {
            return;
        }

        const matches = body.image.match(/^data:(.+);base64,(.+)$/);
        if (!matches) {
            throw new Error('Invalid base64 string');
        }

        if (item?.image) {
            await this.destroyImage(item.image);
        }

        const extension = matches[1].split('/')[1];
        const data = matches[2];
        const fileName = randomstring.generate();

        const filePath = path.join(path.resolve(), 'public', 'uploads', `${fileName}.${extension}`);

        await fs.promises.mkdir(path.dirname(filePath), { recursive: true });

        await fs.promises.writeFile(filePath, data, { encoding: 'base64' });

        return `${fileName}.${extension}`;
    }

    async destroyImage(image) {
        const filePath = path.join(path.resolve(), 'public', 'uploads', image);

        if (fs.existsSync(filePath)) {
            await fs.promises.unlink(filePath);
        }
    }
}
