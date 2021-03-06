"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const shortid_1 = require("shortid");
class Collection {
    constructor(dir, name) {
        this.name = name;
        this.entities = [];
        this.file = path_1.join(dir, name + '.json');
        this.load();
    }
    create(obj) {
        const entity = Object.assign({ id: shortid_1.generate() }, obj);
        this.entities.push(entity);
        this.save();
        return entity.id;
    }
    delete(id) {
        this.load();
        const index = this.findIndex(id);
        this.entities.splice(index, 1);
        this.save();
    }
    get(id) {
        this.load();
        return this.entities.find((item) => item.id === id);
    }
    list() {
        this.load();
        return this.entities;
    }
    update(entity) {
        this.load();
        const index = this.findIndex(entity.id);
        this.entities[index] = entity;
        this.save();
    }
    findIndex(id) {
        this.load();
        const index = this.entities.findIndex((current) => current.id === id);
        if (index === -1) {
            throw new Error(`No ${this.name} found with id "${id}"`);
        }
        return index;
    }
    load() {
        if (fs_1.existsSync(this.file)) {
            this.entities = JSON.parse(fs_1.readFileSync(this.file, { encoding: 'utf8' }));
        }
    }
    save() {
        fs_1.writeFileSync(this.file, JSON.stringify(this.entities, null, 2), { encoding: 'utf8' });
    }
}
exports.Collection = Collection;
