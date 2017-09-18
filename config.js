'use strict'

/* BUCKET DE FOTOS */
const DEFAULT_BUCKET_PHOTO = 'BUCKET_PHOTO';

/* TABELA DYNAMODB PARA REGISTRO DE OCORRÊNCIAS*/
const DEFAULT_DB_OCCURRENCE = 'DB_OCURRENCE_TESTE1';

const DEFAULT_DB_USER = 'DB_USER_TESTE1';

module.exports.location = () => {
	return {
		bucketPhoto: getBucketPhoto(),
		tableOccurrence: getTableOccurrence(),
		tableUser: getTableUser()
	}
}

function getBucketPhoto() {
	return 'api-serverless-ocurrence-teste-01';
}

function getTableOccurrence() {
	return DEFAULT_DB_OCCURRENCE;
}

function getTableUser() {
	return DEFAULT_DB_USER;
}