'use strict'

/* BUCKET DE FOTOS */
const DEFAULT_BUCKET_PHOTO = 'BUCKET_PHOTO';

/* TABELA DYNAMODB PARA REGISTRO DE OCORRÊNCIAS*/
const DEFAULT_DB_OCCURRENCE = 'DB_OCURRENCE';

module.exports.location = () => {
	return {
		bucketPhoto: getBucketPhoto(),
		tableOccurrence: getTableOccurrence()
	}
}

function getBucketPhoto() {
	return process.env[DEFAULT_ENV_BUCKET_PHOTO] || DEFAULT_BUCKET_PHOTO;
}

function getTableOccurrence() {
	return process.env[DEFAULT_ENV_DB_OCCURRENCE] || DEFAULT_DB_OCCURRENCE;
}
