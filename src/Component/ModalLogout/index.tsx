import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, Dimensions } from 'react-native';
import MainStyle from '../../MainStyle';
import Button from '../Button/Button';

const ModalLogout = ({
    isOpen,
    confirmModal,
    closeModal
}: {
    isOpen: boolean,
    confirmModal?: () => void,
    closeModal?: () => void
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isOpen}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.textLogout}>Bạn có muốn thoát khỏi hệ thống không?</Text>
                    <View style={styles.rowView}>
                        <Button
                            styleButton={styles.btnButton}
                            title='Đồng ý'
                            onPress={confirmModal} />
                        <Button
                            styleButton={[styles.btnButton, { backgroundColor: 'gray' }]}
                            title='Huỷ'
                            onPress={closeModal} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: MainStyle.mainBackground,
        width: Dimensions.get('window').width * 0.9,
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.4,
        shadowRadius: 20,
        elevation: 10
    },
    rowView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    btnButton: {
        margin: 10,
        minWidth: 100,
        alignItems: 'center',
        borderRadius: 10
    },
    textLogout: {
        fontSize: MainStyle.mainSizeText,
        textAlign: 'center',
        marginBottom: 10
    }
});

export default ModalLogout;