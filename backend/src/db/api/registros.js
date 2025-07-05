
const db = require('../models');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class RegistrosDBApi {

    static async create(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const registros = await db.registros.create(
            {
                id: data.id || undefined,

        fecha_hora: data.fecha_hora
        ||
        null
            ,

        tiempo_registrado: data.tiempo_registrado
        ||
        null
            ,

        cumplimiento: data.cumplimiento
        ||
        false

            ,

        diferencia_tiempo: data.diferencia_tiempo
        ||
        null
            ,

            importHash: data.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
    },
        { transaction },
    );

        return registros;
    }

    static async bulkImport(data, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        // Prepare data - wrapping individual data transformations in a map() method
        const registrosData = data.map((item, index) => ({
                id: item.id || undefined,

                fecha_hora: item.fecha_hora
            ||
            null
            ,

                tiempo_registrado: item.tiempo_registrado
            ||
            null
            ,

                cumplimiento: item.cumplimiento
            ||
            false

            ,

                diferencia_tiempo: item.diferencia_tiempo
            ||
            null
            ,

            importHash: item.importHash || null,
            createdById: currentUser.id,
            updatedById: currentUser.id,
            createdAt: new Date(Date.now() + index * 1000),
    }));

        // Bulk create items
        const registros = await db.registros.bulkCreate(registrosData, { transaction });

        return registros;
    }

    static async update(id, data, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const registros = await db.registros.findByPk(id, {}, {transaction});

        const updatePayload = {};

        if (data.fecha_hora !== undefined) updatePayload.fecha_hora = data.fecha_hora;

        if (data.tiempo_registrado !== undefined) updatePayload.tiempo_registrado = data.tiempo_registrado;

        if (data.cumplimiento !== undefined) updatePayload.cumplimiento = data.cumplimiento;

        if (data.diferencia_tiempo !== undefined) updatePayload.diferencia_tiempo = data.diferencia_tiempo;

        updatePayload.updatedById = currentUser.id;

        await registros.update(updatePayload, {transaction});

        return registros;
    }

    static async deleteByIds(ids, options) {
        const currentUser = (options && options.currentUser) || { id: null };
        const transaction = (options && options.transaction) || undefined;

        const registros = await db.registros.findAll({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
            transaction,
        });

        await db.sequelize.transaction(async (transaction) => {
            for (const record of registros) {
                await record.update(
                    {deletedBy: currentUser.id},
                    {transaction}
                );
            }
            for (const record of registros) {
                await record.destroy({transaction});
            }
        });

        return registros;
    }

    static async remove(id, options) {
        const currentUser = (options && options.currentUser) || {id: null};
        const transaction = (options && options.transaction) || undefined;

        const registros = await db.registros.findByPk(id, options);

        await registros.update({
            deletedBy: currentUser.id
        }, {
            transaction,
        });

        await registros.destroy({
            transaction
        });

        return registros;
    }

    static async findBy(where, options) {
        const transaction = (options && options.transaction) || undefined;

        const registros = await db.registros.findOne(
            { where },
            { transaction },
        );

        if (!registros) {
            return registros;
        }

        const output = registros.get({plain: true});

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

            if (filter.fecha_horaRange) {
                const [start, end] = filter.fecha_horaRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    fecha_hora: {
                    ...where.fecha_hora,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    fecha_hora: {
                    ...where.fecha_hora,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.tiempo_registradoRange) {
                const [start, end] = filter.tiempo_registradoRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    tiempo_registrado: {
                    ...where.tiempo_registrado,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    tiempo_registrado: {
                    ...where.tiempo_registrado,
                            [Op.lte]: end,
                    },
                };
                }
            }

            if (filter.diferencia_tiempoRange) {
                const [start, end] = filter.diferencia_tiempoRange;

                if (start !== undefined && start !== null && start !== '') {
                    where = {
                        ...where,
                    diferencia_tiempo: {
                    ...where.diferencia_tiempo,
                            [Op.gte]: start,
                    },
                };
                }

                if (end !== undefined && end !== null && end !== '') {
                    where = {
                        ...where,
                    diferencia_tiempo: {
                    ...where.diferencia_tiempo,
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

            if (filter.cumplimiento) {
                where = {
                    ...where,
                cumplimiento: filter.cumplimiento,
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
            const { rows, count } = await db.registros.findAndCountAll(queryOptions);

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
                        'registros',
                        'fecha_hora',
                        query,
                    ),
                ],
            };
        }

        const records = await db.registros.findAll({
            attributes: [ 'id', 'fecha_hora' ],
            where,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            orderBy: [['fecha_hora', 'ASC']],
        });

        return records.map((record) => ({
            id: record.id,
            label: record.fecha_hora,
        }));
    }

};

