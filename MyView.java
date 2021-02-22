import models.Invoice;

import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.io.*;
import java.util.ArrayList;

public class MyView extends JFrame {

    JList listView;

    JPanel listPanel;
    JPanel formPanel;

    public MyView() throws HeadlessException {
        JFrame self = this;

        setSize(800, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);

        listPanel = new JPanel();
        DefaultListModel <Invoice> listModel = new DefaultListModel();
        listView = new JList(listModel);
        listPanel.add(listView);
        listModel.addElement(
                new Invoice(4, 34, "Denis")
        );


        formPanel = new JPanel();
        formPanel.setLayout(new BoxLayout(formPanel, BoxLayout.Y_AXIS));
        JTextField homeNumberInput = new JTextField();
        JTextField flatNumberInput = new JTextField();
        JTextField fullNameInput = new JTextField();
        JButton submit = new JButton("Submit");
        formPanel.add(homeNumberInput);
        formPanel.add(flatNumberInput);
        formPanel.add(fullNameInput);
        formPanel.add(submit);

        submit.addActionListener(new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int homeNumber = Integer.parseInt(homeNumberInput.getText());
                int flatNumber = Integer.parseInt(flatNumberInput.getText());
                String fullName = fullNameInput.getText();

                listModel.addElement(
                        new Invoice(homeNumber, flatNumber, fullName)
                );
            }
        });

        JPanel panel = new JPanel();
        panel.setLayout(new BorderLayout());
        panel.add(listPanel, BorderLayout.NORTH);
        setContentPane(panel);

        JMenuBar menuBar = new JMenuBar();

        JMenu fileMenu = new JMenu("File");

        JMenuItem load = new JMenuItem("Load");
        JMenuItem save = new JMenuItem("Save");

        fileMenu.add(load);
        fileMenu.add(save);
        menuBar.add(fileMenu);
        setJMenuBar(menuBar);

        load.addActionListener(new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JFileChooser fileChooser = new JFileChooser();

                int result = fileChooser.showOpenDialog(self);
                if (result != JFileChooser.APPROVE_OPTION) {
                    return;
                }

                File file = fileChooser.getSelectedFile();

                try {
                    FileInputStream fis = new FileInputStream(file);
                    ObjectInputStream ois = new ObjectInputStream(fis);
                    ArrayList<Invoice> loadedInvoices = (ArrayList) ois.readObject();
                    ois.close();
                    fis.close();

                    listModel.clear();
                    for(Invoice invoice : loadedInvoices) {
                        listModel.addElement(invoice);
                    }
                } catch (IOException | ClassNotFoundException e1) {
                    e1.printStackTrace();
                }
            }
        });

        save.addActionListener(new AbstractAction() {
            @Override
            public void actionPerformed(ActionEvent e) {
                JFileChooser fileChooser = new JFileChooser();

                int result = fileChooser.showSaveDialog(self);
                if (result != JFileChooser.APPROVE_OPTION) {
                    return;
                }

                File file = fileChooser.getSelectedFile();


                try {
                    FileOutputStream fos = new FileOutputStream(file);
                    ObjectOutputStream oos= new ObjectOutputStream(fos);

                    ArrayList<Invoice> invoices = new ArrayList<>();

                    for(int i = 0; i < listModel.size(); ++i) {
                        invoices.add(listModel.get(i));
                    }

                    oos.writeObject(invoices);
                    oos.close();
                    fos.close();
                } catch (IOException e1) {
                    e1.printStackTrace();
                }
            }
        });

        JPanel statusPanel = new JPanel();
        JLabel status = new JLabel("Here is my status");
        statusPanel.add(status);

        JPanel southPanel = new JPanel(new BorderLayout());
        southPanel.add(formPanel, BorderLayout.CENTER);
        southPanel.add(statusPanel, BorderLayout.SOUTH);

        panel.add(southPanel, BorderLayout.SOUTH);

        //Разместим программу по центру
        setLocationRelativeTo(null);
        setVisible(true);
    }
}
