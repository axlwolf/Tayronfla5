
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class ConfiguracionesDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const configuraciones = await db.configuraciones.create(
            {
                id: data.id || undefined,

        tiempo_objetivo: data.tiempo_objetivo
        ||
        null
            ,

        tiempo_luz_amarilla: data.tiempo_luz_amarilla
        ||
        null
            ,

        tiempo_luz_roja: data.tiempo_luz_roja
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return configuraciones;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const configuracionesData = data.map((item, index) => ({
                id: item.id || undefined,

                tiempo_objetivo: item.tiempo_objetivo
            ||
            null
            ,

                tiempo_luz_amarilla: item.tiempo_luz_amarilla
            ||
            null
            ,

                tiempo_luz_roja: item.tiempo_luz_roja
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const configuraciones = await db.configuraciones.bulkCreate(configuracionesData, { transaction });

        return configuraciones;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const configuraciones = await db.configuraciones.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.tiempo_objetivo !== undefined) updatePayload.tiempo_objetivo = data.tiempo_objetivo;

        if (data.tiempo_luz_amarilla !== undefined) updatePayload.tiempo_luz_amarilla = data.tiempo_luz_amarilla;

        if (data.tiempo_luz_roja !== undefined) updatePayload.tiempo_luz_roja = data.tiempo_luz_roja;

        updatePayload.updatedById = currentUser.id;

        await configuraciones.update(updatePayload, {transaction});

        return configuraciones;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const configuraciones = await db.configuraciones.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of configuraciones) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of configuraciones) {
                await record.destroy({transaction});
            }
        });

        return configuraciones;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const configuraciones = await db.configuraciones.findByPk(id, options);

        await configuraciones.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await configuraciones.destroy({
            transaction
        });

        return configuraciones;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const configuraciones = await db.configuraciones.findOne(
            { where },
            { transaction },
        );

        if (!configuraciones) {
            return configuraciones;
        }

        const output = configuraciones.get({plain: true});

        return output;
    }

    static async findAll(filter, options) {
        const limit = filter.limit || 0;
        let offset = 0;
        let where = {};
        const currentPage = +filter.page;

        const user = (options && options.currentUser) || null;

        offset = currentPage * limit;

        const orderBy = null;

        const transaction = (options && options.transaction) || undefined;

        let include = [];

        if (filter) {
            if (filter.id) {
                where = {
                    ...where,
                    ['id']: Utils.uuid(filter.id),
                };
            }

            if (filter.tiempo_objetivoRange) {
                const [start, end] = filter.tiempo_objetivoRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    tiempo_objetivo: {
                    ...where.tiempo_objetivo,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    tiempo_objetivo: {
                    ...where.tiempo_objetivo,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.tiempo_luz_amarillaRange) {
                const [start, end] = filter.tiempo_luz_amarillaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    tiempo_luz_amarilla: {
                    ...where.tiempo_luz_amarilla,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    tiempo_luz_amarilla: {
                    ...where.tiempo_luz_amarilla,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.tiempo_luz_rojaRange) {
                const [start, end] = filter.tiempo_luz_rojaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    tiempo_luz_roja: {
                    ...where.tiempo_luz_roja,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    tiempo_luz_roja: {
                    ...where.tiempo_luz_roja,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.active !== undefined) {
                where = {
                    ...where,
                    active: filter.active === true || filter.active === 'true'
                };
            }

            if (filter.createdAtRange) {
                const [start, end] = filter.createdAtRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.gte]: start,
                        },
                    };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                        ['createdAt']: {
                            ...where.createdAt,
                            [Op.lte]: end,
                        },
                    };
                }
            }
        }

        const queryOptions = {
            where,
            include,
            distinct: true,
            order: filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction: options?.transaction,
            logging: console.log
        };

        if (!options?.countOnly) {
            queryOptions.limit = limit ? Number(limit) : undefined;
            queryOptions.offset = offset ? Number(offset) : undefined;
        }

        try {
            const { rows, count } = await db.configuraciones.findAndCountAll(queryOptions);

            return {
                rows: options?.countOnly ? [] : rows,
                count: count
            };
        } catch (error) {
            console.error('Error executing query:', error);
            throw error;
        }
    }

    static async findAllAutocomplete(query, limit, offset) {
        let where = {};

        if (query) {
            where = {
                [Op.or]: [
                    { ['id']: Utils.uuid(query) },
                    Utils.ilike(
                        'configuraciones',
                        'tiempo_objetivo',
                        query,
                    ),
                ],
            };
        }

        const records = await db.configuraciones.findAll({
            attributes: [ 'id', 'tiempo_objetivo' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['tiempo_objetivo', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.tiempo_objetivo,
        }));
    }

};

